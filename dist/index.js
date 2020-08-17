"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const util_1 = require("util");
const path_1 = require("path");
const glob_1 = require("glob");
const helpers_1 = require("./helpers");
const config = require("../config.json");
const glob = util_1.promisify(glob_1.glob);
const main = async () => {
    try {
        // find all json files in the input dir
        const files = await glob(path_1.join(config.INPUT_DIR, "**/*.json"));
        // read all json files
        const strings = (await Promise.all(files.map((path) => fs_1.promises.readFile(path, "utf-8"))))
            // parse all jsons
            .map((str) => JSON.parse(str))
            // extract all strings from each json
            .map((json) => helpers_1.extractStrings(json))
            // as we have now string[][], we need to flat it to string[]
            .flat();
        // count occurences of each string
        const stats = helpers_1.countStrings(strings);
        // save formatted stats
        await fs_1.promises.writeFile(config.STATS_FILE, helpers_1.formatStats(stats));
        console.log(`Done. Found ${strings.length} strings in ${files.length} json files.`);
        console.log(`Stats saved to ${config.STATS_FILE}`);
    }
    catch (err) {
        console.error("Something went wrong...");
        console.error(err);
        process.exit(1);
    }
};
main();
