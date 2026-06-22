import { copyFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import process from "node:process";

const projectRoot = process.cwd();
const sourcePath = path.resolve(
  projectRoot,
  process.argv[2] ?? "private-assets/neet-2026-answer-key-ilmalink-mumtaz.pdf"
);
const outputPath = path.resolve(
  projectRoot,
  process.argv[3] ??
    "private-assets/neet-2026-question-paper-analysis-compressed.pdf"
);

await mkdir(path.dirname(outputPath), { recursive: true });

try {
  await stat(sourcePath);
} catch {
  console.warn(
    `NEET PDF source not found at ${sourcePath}. The existing protected download, if present, was left unchanged.`
  );
  process.exit(0);
}

const pythonProgram = process.platform === "win32" ? "python" : "python3";
const pythonScript = `
import fitz
import pathlib
import sys

source = pathlib.Path(sys.argv[1])
output = pathlib.Path(sys.argv[2])
document = fitz.open(source)
document.save(
    output,
    garbage=4,
    clean=True,
    deflate=True,
    deflate_images=True,
    deflate_fonts=True,
)
document.close()
`;

const compression = spawnSync(
  pythonProgram,
  ["-c", pythonScript, sourcePath, outputPath],
  { encoding: "utf8" }
);

if (compression.status !== 0) {
  await copyFile(sourcePath, outputPath);
  console.warn(
    "PyMuPDF compression was unavailable. The source PDF was copied to the protected download path without failing the build."
  );
} else {
  const [source, output] = await Promise.all([
    stat(sourcePath),
    stat(outputPath),
  ]);
  console.log(
    `NEET PDF ready: ${(source.size / 1024 / 1024).toFixed(2)} MB -> ${(output.size / 1024 / 1024).toFixed(2)} MB`
  );
}
