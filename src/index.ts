import { promises as fs } from "fs";
import { promisify } from "util";
import { join } from "path";
import { glob as globWithCb } from "glob";
import { extractStrings, countStrings, formatStats } from "./helpers";

interface Config {
  /** Directory with input json files. */
  INPUT_DIR: string;
  /** File to which statistics should be written to. */
  STATS_FILE: string;
}

const config = require("../config.json") as Config;
const glob = promisify(globWithCb);

const main = async () => {
  try {
    // find all json files in the input dir
    const files = await glob(join(config.INPUT_DIR, "**/*.json"));

    // read all json files
    const strings = (
      await Promise.all(files.map((path) => fs.readFile(path, "utf-8")))
    )
      // parse all jsons
      .map((str) => JSON.parse(str))
      // extract all strings from each json
      .map((json) => extractStrings(json))
      // as we have now string[][], we need to flat it to string[]
      .flat();

    // count occurences of each string
    const stats = countStrings(strings);

    // save formatted stats
    await fs.writeFile(config.STATS_FILE, formatStats(stats));

    console.log(
      `Done. Found ${strings.length} strings in ${files.length} json files.`
    );
    console.log(`Stats saved to ${config.STATS_FILE}`);
    
  } catch (err) {
    console.error("Something went wrong...");
    console.error(err);
    process.exit(1);
  }
};

main();
