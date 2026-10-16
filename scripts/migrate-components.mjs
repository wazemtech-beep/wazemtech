import { fileURLToPath } from "node:url";
import { runMigration } from "../../tools/template-migration/run.mjs";
import config from "../migration.config.mjs";

try {
  await runMigration(fileURLToPath(new URL("../", import.meta.url)), config, process.argv.slice(2));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
