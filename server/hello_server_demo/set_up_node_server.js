const fs = require('fs');
const chalk = require('chalk'); // Not needed although can be used for highlighting console text

const folders = require("./config.json");
const server_filepath = folders.server_files;
const public_files = folders.templates;
const public_folder_filepaths = folders.public_folder_filepaths;

for (let i = 0; i < folders.directories.length; i++) {
    fs.mkdir(folders.directories[i].name, (err) => {
        if (err) {
            if (err.code === 'EEXIST') {
                let warn = chalk.yellow(folders.directories[i].name);
                console.warn(`Directory: ${warn} already exists!`);
            } else {
                console.log(err);
            }
        }
    });
}

fs.copyFile('SERVER', `${folders.directories[1].name}${server_filepath}`, fs.constants.COPYFILE_EXCL, (err) => {
    if (err) throw err;
});

for (let i = 0; i < public_files.length; i++) {
    fs.copyFile(public_files[i], `${folders.directories[2].name}${public_folder_filepaths[i]}`, fs.constants.COPYFILE_EXCL, (err) => {
        if (err) throw err;
    });
}

for (let i = 0; i < public_files.length; i++) {
    fs.unlink(public_files[i], (err) => {
        if (err) console.log(err);

        console.log("Deleting -> " + public_files[i]);
    });
}
fs.unlink('SERVER', (err) => {
    if (err) console.log(err);
    console.log("Deleting -> SERVER");
});
fs.unlink('config.json', (err) => {
    if (err) console.log(err);
    console.log("Deleting -> config.json");
});
fs.unlink('set_up_node_server.js', (err) => {
    if (err) console.log(err);
    console.log("Deleting -> set_up_node_server.js");
});