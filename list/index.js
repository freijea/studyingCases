#!/usr/bin/env node

const fs    = require('fs');
const chalk = require('chalk');
const path  = require('path');
const {lstat} = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => { // process module don't need to be required, once it's automatically added to global scope every project in node.
    if(err) {
        console.log(err);
    } 

    const statPromises = filenames.map((filename) => { // array with promises with every file in the same order of the filenames array.
        return lstat(path.join(targetDir, filename)); // return promises with status pending
    });


    const allStats = await Promise.all(statPromises); // execute and resolved all promises and save it in a array

    for(let stats of allStats) {
        const index = allStats.indexOf(stats); // identifying the index
        // print the files in the same order from the directory.
        if (stats.isFile()) {
            console.log(chalk.bold(filenames[index]));
        } else {
            console.log(chalk.bold.red(filenames[index]));
        }
    }
});
