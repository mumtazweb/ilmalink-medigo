import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const targetPath = join(
  rootDir,
  "node_modules",
  "next",
  "dist",
  "shared",
  "lib",
  "router",
  "utils",
  "compare-states.js"
);

if (!existsSync(targetPath)) {
  mkdirSync(dirname(targetPath), { recursive: true });
  writeFileSync(
    targetPath,
    `"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "compareRouterStates", {
  enumerable: true,
  get: function() {
    return compareRouterStates;
  }
});
function compareRouterStates(a, b) {
  const stateKeys = Object.keys(a);
  if (stateKeys.length !== Object.keys(b).length) return false;
  for (let i = stateKeys.length; i--; ) {
    const key = stateKeys[i];
    if (key === "query") {
      const queryKeys = Object.keys(a.query);
      if (queryKeys.length !== Object.keys(b.query).length) return false;
      for (let j = queryKeys.length; j--; ) {
        const queryKey = queryKeys[j];
        if (!Object.prototype.hasOwnProperty.call(b.query, queryKey) || a.query[queryKey] !== b.query[queryKey]) {
          return false;
        }
      }
    } else if (!Object.prototype.hasOwnProperty.call(b, key) || a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
//# sourceMappingURL=compare-states.js.map
`,
    "utf8"
  );
  console.log("Repaired missing Next router compare-states.js.");
}
