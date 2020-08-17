A simple script to get string occurences in json files. Multiple files can be processed at once, but only one stat file will be generated.

A `config.json` file is needed in the root directory of the project with two paths:

`{
    "INPUT_DIR": "",
    "STATS_FILE": ""
}`

`INPUT_DIR` is the path were jsons to analyze are placed (script is using a glob pattern to find all json files in this directory).
`STATS_FILE` is the path to file where stats should be written to.

`npm start` to start the script.