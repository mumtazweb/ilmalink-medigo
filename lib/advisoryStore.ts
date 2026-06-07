import type { AdvisorySource } from "@/app/data/advisorySources";
import { advisorySources } from "@/app/data/advisorySources";

import {
  executeQuery,
  executeTransaction,
  queryRows,
} from "./db";
import type { AdvisoryFoundLink } from "./advisoryFetcher";

export type AdvisoryStatus =
  | "Needs Review"
  | "Approved"
  | "Archived"
  | "Rejected";

export type AdvisorySourceRecord = AdvisorySource & {
  lastChecked: string | null;
  lastKnownHash: string | null;
  isActive: boolean;
  createdAt: string | null;
};

export type AdvisoryExtractedData = {
  textPreview?: string;
  foundLinks?: AdvisoryFoundLink[];
  pdfLinks?: AdvisoryFoundLink[];
  keywordMatches?: string[];
  hash?: string;
  signals?: string[];
  checkedAt?: string;
  [key: string]: unknown;
};

export type OfficialTextVersionInput = {
  id: string;
  sourceId: string;
  country: string;
  category: string;
  sourceName: string;
  sourceType: string;
  title: string;
  versionLabel: string;
  roundLabel: string | null;
  sourceUrl: string;
  sourceReference: string;
  extractedText: string;
  extractedData: AdvisoryExtractedData | null;
  detectedAt: string;
  effectiveDate: string | null;
  status: AdvisoryStatus;
  adminNote: string | null;
  publicSummary: string | null;
};

export type OfficialTextVersion = OfficialTextVersionInput & {
  createdAt: string | null;
  lastChecked: string | null;
};

export type OfficialTextVersionChangeInput = {
  id: string;
  oldVersionId: string | null;
  newVersionId: string;
  sourceId: string;
  country: string;
  category: string;
  changeSummary: string;
  addedItems: unknown[] | null;
  removedItems: unknown[] | null;
  changedItems: unknown[] | null;
  adminNote: string | null;
  status: AdvisoryStatus;
};

export type OfficialTextVersionChange =
  OfficialTextVersionChangeInput & {
    createdAt: string | null;
    approvedAt: string | null;
  };

type AdvisorySourceRow = {
  id: string;
  country: string;
  source_name: string;
  source_type: AdvisorySource["sourceType"];
  url: string;
  priority: AdvisorySource["priority"];
  monitor_frequency: AdvisorySource["monitorFrequency"];
  category: AdvisorySource["category"];
  keywords: unknown;
  last_checked: Date | string | null;
  last_known_hash: string | null;
  is_active: number | boolean;
  created_at: Date | string | null;
};

type OfficialTextVersionRow = {
  id: string;
  source_id: string;
  country: string;
  category: string;
  source_name: string;
  source_type: string;
  title: string;
  version_label: string;
  round_label: string | null;
  source_url: string;
  source_reference: string;
  extracted_text: string;
  extracted_data: unknown;
  detected_at: Date | string;
  effective_date: string | null;
  status: AdvisoryStatus;
  admin_note: string | null;
  public_summary: string | null;
  created_at: Date | string | null;
  last_checked?: Date | string | null;
};

type OfficialTextVersionChangeRow = {
  id: string;
  old_version_id: string | null;
  new_version_id: string;
  source_id: string;
  country: string;
  category: string;
  change_summary: string;
  added_items: unknown;
  removed_items: unknown;
  changed_items: unknown;
  admin_note: string | null;
  status: AdvisoryStatus;
  created_at: Date | string | null;
  approved_at: Date | string | null;
};

export const ADVISORY_SCHEMA_SQL = [
  `CREATE TABLE IF NOT EXISTS advisory_sources (
    id varchar(120) primary key,
    country varchar(120),
    source_name varchar(255),
    source_type varchar(120),
    url text,
    priority varchar(50),
    monitor_frequency varchar(50),
    category varchar(120),
    keywords json,
    last_checked datetime null,
    last_known_hash varchar(255) null,
    is_active tinyint(1) default 1,
    created_at datetime default current_timestamp,
    index advisory_sources_country_idx (country),
    index advisory_sources_category_idx (category),
    index advisory_sources_active_idx (is_active)
  )`,
  `CREATE TABLE IF NOT EXISTS official_text_versions (
    id varchar(120) primary key,
    source_id varchar(120),
    country varchar(120),
    category varchar(120),
    source_name varchar(255),
    source_type varchar(120),
    title text,
    version_label varchar(255),
    round_label varchar(120) null,
    source_url text,
    source_reference text,
    extracted_text longtext,
    extracted_data json null,
    detected_at datetime,
    effective_date varchar(120) null,
    status varchar(80),
    admin_note text null,
    public_summary text null,
    created_at datetime default current_timestamp,
    index official_text_versions_source_idx (source_id),
    index official_text_versions_status_idx (status),
    index official_text_versions_category_idx (category),
    index official_text_versions_detected_idx (detected_at)
  )`,
  `CREATE TABLE IF NOT EXISTS official_text_version_changes (
    id varchar(120) primary key,
    old_version_id varchar(120) null,
    new_version_id varchar(120),
    source_id varchar(120),
    country varchar(120),
    category varchar(120),
    change_summary text,
    added_items json null,
    removed_items json null,
    changed_items json null,
    admin_note text null,
    status varchar(80),
    created_at datetime default current_timestamp,
    approved_at datetime null,
    index official_text_version_changes_new_idx (new_version_id),
    index official_text_version_changes_source_idx (source_id),
    index official_text_version_changes_status_idx (status)
  )`,
].join(";\n\n");

let schemaPromise: Promise<void> | null = null;
let sourcesSyncPromise: Promise<void> | null = null;

function toMysqlDate(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);

  return date.toISOString().slice(0, 19).replace("T", " ");
}

function fromMysqlDate(value: Date | string | null | undefined) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  const parsed = new Date(value);

  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toISOString();
}

function parseJson<T>(value: unknown, fallback: T): T {
  if (value === null || value === undefined) {
    return fallback;
  }

  if (Buffer.isBuffer(value)) {
    return parseJson(value.toString("utf8"), fallback);
  }

  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }

  return value as T;
}

function isConfiguredOfficialUrl(url: string) {
  return /^https?:\/\//i.test(url) && !url.startsWith("PASTE_");
}

function mapSourceRow(row: AdvisorySourceRow): AdvisorySourceRecord {
  return {
    id: row.id,
    country: row.country,
    sourceName: row.source_name,
    sourceType: row.source_type,
    url: row.url,
    priority: row.priority,
    monitorFrequency: row.monitor_frequency,
    category: row.category,
    keywords: parseJson<string[]>(row.keywords, []),
    lastChecked: fromMysqlDate(row.last_checked),
    lastKnownHash: row.last_known_hash,
    isActive: Boolean(row.is_active),
    createdAt: fromMysqlDate(row.created_at),
  };
}

function mapVersionRow(
  row: OfficialTextVersionRow
): OfficialTextVersion {
  return {
    id: row.id,
    sourceId: row.source_id,
    country: row.country,
    category: row.category,
    sourceName: row.source_name,
    sourceType: row.source_type,
    title: row.title,
    versionLabel: row.version_label,
    roundLabel: row.round_label,
    sourceUrl: row.source_url,
    sourceReference: row.source_reference,
    extractedText: row.extracted_text,
    extractedData: parseJson<AdvisoryExtractedData | null>(
      row.extracted_data,
      null
    ),
    detectedAt: fromMysqlDate(row.detected_at) ?? "",
    effectiveDate: row.effective_date,
    status: row.status,
    adminNote: row.admin_note,
    publicSummary: row.public_summary,
    createdAt: fromMysqlDate(row.created_at),
    lastChecked: fromMysqlDate(row.last_checked),
  };
}

function mapChangeRow(
  row: OfficialTextVersionChangeRow
): OfficialTextVersionChange {
  return {
    id: row.id,
    oldVersionId: row.old_version_id,
    newVersionId: row.new_version_id,
    sourceId: row.source_id,
    country: row.country,
    category: row.category,
    changeSummary: row.change_summary,
    addedItems: parseJson<unknown[] | null>(
      row.added_items,
      null
    ),
    removedItems: parseJson<unknown[] | null>(
      row.removed_items,
      null
    ),
    changedItems: parseJson<unknown[] | null>(
      row.changed_items,
      null
    ),
    adminNote: row.admin_note,
    status: row.status,
    createdAt: fromMysqlDate(row.created_at),
    approvedAt: fromMysqlDate(row.approved_at),
  };
}

async function ensureAdvisoryTables() {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      for (const statement of ADVISORY_SCHEMA_SQL.split(";\n\n")) {
        await executeQuery(statement);
      }
    })();
  }

  try {
    await schemaPromise;
  } catch (error) {
    schemaPromise = null;
    throw error;
  }
}

export async function syncAdvisorySources() {
  if (!sourcesSyncPromise) {
    sourcesSyncPromise = (async () => {
      await ensureAdvisoryTables();

      for (const source of advisorySources) {
        await executeQuery(
          `INSERT INTO advisory_sources (
            id,
            country,
            source_name,
            source_type,
            url,
            priority,
            monitor_frequency,
            category,
            keywords,
            is_active
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            country = VALUES(country),
            source_name = VALUES(source_name),
            source_type = VALUES(source_type),
            url = VALUES(url),
            priority = VALUES(priority),
            monitor_frequency = VALUES(monitor_frequency),
            category = VALUES(category),
            keywords = VALUES(keywords),
            is_active = VALUES(is_active)`,
          [
            source.id,
            source.country,
            source.sourceName,
            source.sourceType,
            source.url,
            source.priority,
            source.monitorFrequency,
            source.category,
            JSON.stringify(source.keywords),
            isConfiguredOfficialUrl(source.url) ? 1 : 0,
          ]
        );
      }
    })();
  }

  try {
    await sourcesSyncPromise;
  } catch (error) {
    sourcesSyncPromise = null;
    throw error;
  }
}

export async function getSources() {
  await syncAdvisorySources();

  const rows = await queryRows<AdvisorySourceRow>(
    `SELECT *
     FROM advisory_sources
     ORDER BY FIELD(priority, 'High', 'Medium', 'Low'),
       country,
       source_name`
  );

  return rows.map(mapSourceRow);
}

export async function getSourceById(id: string) {
  await syncAdvisorySources();

  const rows = await queryRows<AdvisorySourceRow>(
    `SELECT *
     FROM advisory_sources
     WHERE id = ?
     LIMIT 1`,
    [id]
  );

  return rows[0] ? mapSourceRow(rows[0]) : null;
}

export async function updateSourceLastChecked(
  sourceId: string,
  hash: string | null,
  checkedAt: string
) {
  await syncAdvisorySources();

  if (hash) {
    await executeQuery(
      `UPDATE advisory_sources
       SET last_checked = ?, last_known_hash = ?
       WHERE id = ?`,
      [toMysqlDate(checkedAt), hash, sourceId]
    );
    return;
  }

  await executeQuery(
    `UPDATE advisory_sources
     SET last_checked = ?
     WHERE id = ?`,
    [toMysqlDate(checkedAt), sourceId]
  );
}

export async function createTextVersion(
  version: OfficialTextVersionInput
) {
  await ensureAdvisoryTables();

  await executeQuery(
    `INSERT INTO official_text_versions (
      id,
      source_id,
      country,
      category,
      source_name,
      source_type,
      title,
      version_label,
      round_label,
      source_url,
      source_reference,
      extracted_text,
      extracted_data,
      detected_at,
      effective_date,
      status,
      admin_note,
      public_summary
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      version.id,
      version.sourceId,
      version.country,
      version.category,
      version.sourceName,
      version.sourceType,
      version.title,
      version.versionLabel,
      version.roundLabel,
      version.sourceUrl,
      version.sourceReference,
      version.extractedText,
      version.extractedData ? JSON.stringify(version.extractedData) : null,
      toMysqlDate(version.detectedAt),
      version.effectiveDate,
      version.status,
      version.adminNote,
      version.publicSummary,
    ]
  );
}

export async function createTextVersionChange(
  change: OfficialTextVersionChangeInput
) {
  await ensureAdvisoryTables();

  await executeQuery(
    `INSERT INTO official_text_version_changes (
      id,
      old_version_id,
      new_version_id,
      source_id,
      country,
      category,
      change_summary,
      added_items,
      removed_items,
      changed_items,
      admin_note,
      status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      change.id,
      change.oldVersionId,
      change.newVersionId,
      change.sourceId,
      change.country,
      change.category,
      change.changeSummary,
      change.addedItems ? JSON.stringify(change.addedItems) : null,
      change.removedItems ? JSON.stringify(change.removedItems) : null,
      change.changedItems ? JSON.stringify(change.changedItems) : null,
      change.adminNote,
      change.status,
    ]
  );
}

async function getVersionById(versionId: string) {
  await ensureAdvisoryTables();

  const rows = await queryRows<OfficialTextVersionRow>(
    `SELECT v.*, s.last_checked
     FROM official_text_versions v
     LEFT JOIN advisory_sources s ON s.id = v.source_id
     WHERE v.id = ?
     LIMIT 1`,
    [versionId]
  );

  return rows[0] ? mapVersionRow(rows[0]) : null;
}

export async function getLatestApprovedVersion(sourceId: string) {
  await ensureAdvisoryTables();

  const rows = await queryRows<OfficialTextVersionRow>(
    `SELECT v.*, s.last_checked
     FROM official_text_versions v
     LEFT JOIN advisory_sources s ON s.id = v.source_id
     WHERE v.source_id = ? AND v.status = 'Approved'
     ORDER BY v.detected_at DESC, v.created_at DESC
     LIMIT 1`,
    [sourceId]
  );

  return rows[0] ? mapVersionRow(rows[0]) : null;
}

export async function getPendingVersions() {
  await ensureAdvisoryTables();

  const rows = await queryRows<OfficialTextVersionRow>(
    `SELECT v.*, s.last_checked
     FROM official_text_versions v
     LEFT JOIN advisory_sources s ON s.id = v.source_id
     WHERE v.status = 'Needs Review'
     ORDER BY v.detected_at DESC, v.created_at DESC`
  );

  return rows.map(mapVersionRow);
}

export async function getPendingVersionBySource(sourceId: string) {
  await ensureAdvisoryTables();

  const rows = await queryRows<OfficialTextVersionRow>(
    `SELECT v.*, s.last_checked
     FROM official_text_versions v
     LEFT JOIN advisory_sources s ON s.id = v.source_id
     WHERE v.source_id = ? AND v.status = 'Needs Review'
     ORDER BY v.detected_at DESC, v.created_at DESC
     LIMIT 1`,
    [sourceId]
  );

  return rows[0] ? mapVersionRow(rows[0]) : null;
}

export async function getApprovedVersions() {
  await ensureAdvisoryTables();

  const rows = await queryRows<OfficialTextVersionRow>(
    `SELECT v.*, s.last_checked
     FROM official_text_versions v
     LEFT JOIN advisory_sources s ON s.id = v.source_id
     WHERE v.status = 'Approved'
     ORDER BY v.detected_at DESC, v.created_at DESC`
  );

  return rows.map(mapVersionRow);
}

export async function getArchivedVersions() {
  await ensureAdvisoryTables();

  const rows = await queryRows<OfficialTextVersionRow>(
    `SELECT v.*, s.last_checked
     FROM official_text_versions v
     LEFT JOIN advisory_sources s ON s.id = v.source_id
     WHERE v.status = 'Archived'
     ORDER BY v.detected_at DESC, v.created_at DESC`
  );

  return rows.map(mapVersionRow);
}

export async function getVersionChangesForVersions(
  versionIds: string[]
) {
  await ensureAdvisoryTables();

  if (versionIds.length === 0) {
    return [];
  }

  const placeholders = versionIds.map(() => "?").join(", ");
  const rows = await queryRows<OfficialTextVersionChangeRow>(
    `SELECT *
     FROM official_text_version_changes
     WHERE new_version_id IN (${placeholders})
     ORDER BY created_at DESC`,
    versionIds
  );

  return rows.map(mapChangeRow);
}

export async function archiveOldVersion(versionId: string) {
  const version = await getVersionById(versionId);

  if (!version) {
    return {
      ok: false,
      message: "Version not found.",
    };
  }

  await executeQuery(
    `UPDATE official_text_versions
     SET status = 'Archived'
     WHERE source_id = ?
       AND category = ?
       AND status = 'Approved'
       AND id <> ?`,
    [version.sourceId, version.category, versionId]
  );

  return {
    ok: true,
    message: "Older approved versions archived.",
  };
}

export async function approveTextVersion(
  versionId: string,
  publicSummary: string,
  adminNote: string,
  approvedBy: string
) {
  const version = await getVersionById(versionId);

  if (!version) {
    return {
      ok: false,
      message: "Version not found.",
    };
  }

  const approvedAt = toMysqlDate(new Date());
  const noteParts = [
    adminNote.trim(),
    approvedBy.trim()
      ? `Approved by: ${approvedBy.trim()}`
      : null,
  ].filter(Boolean);

  await executeTransaction([
    {
      sql: `UPDATE official_text_versions
        SET status = 'Archived'
        WHERE source_id = ?
          AND category = ?
          AND status = 'Approved'
          AND id <> ?`,
      values: [version.sourceId, version.category, versionId],
    },
    {
      sql: `UPDATE official_text_versions
        SET status = 'Approved',
          public_summary = ?,
          admin_note = ?
        WHERE id = ?`,
      values: [
        publicSummary.trim() ||
          version.publicSummary ||
          version.extractedData?.textPreview ||
          version.extractedText.slice(0, 900),
        noteParts.join("\n\n") || null,
        versionId,
      ],
    },
    {
      sql: `UPDATE official_text_version_changes
        SET status = 'Approved',
          admin_note = ?,
          approved_at = ?
        WHERE new_version_id = ?`,
      values: [noteParts.join("\n\n") || null, approvedAt, versionId],
    },
  ]);

  return {
    ok: true,
    message: "Advisory version approved.",
  };
}

export async function rejectTextVersion(
  versionId: string,
  adminNote: string
) {
  await ensureAdvisoryTables();

  await executeTransaction([
    {
      sql: `UPDATE official_text_versions
        SET status = 'Rejected',
          admin_note = ?
        WHERE id = ? AND status = 'Needs Review'`,
      values: [adminNote.trim() || null, versionId],
    },
    {
      sql: `UPDATE official_text_version_changes
        SET status = 'Rejected',
          admin_note = ?
        WHERE new_version_id = ?`,
      values: [adminNote.trim() || null, versionId],
    },
  ]);

  return {
    ok: true,
    message: "Advisory version rejected.",
  };
}
