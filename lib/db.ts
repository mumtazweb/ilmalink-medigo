import { PrismaClient } from "@prisma/client";

type AdvisoryDbGlobal = typeof globalThis & {
  advisoryMysqlPrisma?: PrismaClient;
  advisoryMysqlUrl?: string;
};

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `${name} is required for the advisory tracker MySQL connection.`
    );
  }

  return value;
}

export function getMysqlUrl() {
  const host = getRequiredEnv("MYSQL_HOST");
  const port = process.env.MYSQL_PORT || "3306";
  const database = getRequiredEnv("MYSQL_DATABASE");
  const user = getRequiredEnv("MYSQL_USER");
  const password = getRequiredEnv("MYSQL_PASSWORD");

  return `mysql://${encodeURIComponent(user)}:${encodeURIComponent(
    password
  )}@${host}:${port}/${encodeURIComponent(database)}`;
}

export function getAdvisoryDb() {
  const url = getMysqlUrl();
  const globalForDb = globalThis as AdvisoryDbGlobal;

  if (
    !globalForDb.advisoryMysqlPrisma ||
    globalForDb.advisoryMysqlUrl !== url
  ) {
    globalForDb.advisoryMysqlPrisma = new PrismaClient({
      datasources: {
        db: {
          url,
        },
      },
    });
    globalForDb.advisoryMysqlUrl = url;
  }

  return globalForDb.advisoryMysqlPrisma;
}

export async function queryRows<T>(
  sql: string,
  values: unknown[] = []
) {
  return getAdvisoryDb().$queryRawUnsafe<T[]>(sql, ...values);
}

export async function executeQuery(
  sql: string,
  values: unknown[] = []
) {
  return getAdvisoryDb().$executeRawUnsafe(sql, ...values);
}

export async function executeTransaction(
  statements: Array<{ sql: string; values?: unknown[] }>
) {
  const db = getAdvisoryDb();

  return db.$transaction(
    statements.map((statement) =>
      db.$executeRawUnsafe(
        statement.sql,
        ...(statement.values ?? [])
      )
    )
  );
}
