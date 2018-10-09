const path = require('path');
const fs = require('fs-extra');
const execSync = require('child_process').execSync;

function main() {
    let folder = path.resolve(__dirname, './electron');
    fs.readdirSync(folder).forEach(version => {
        let folder1 = folder + '/' + version;
        if (fs.lstatSync(folder1).isDirectory()) {
            fs.readdirSync(folder1).forEach(platform => {
                let folder2 = folder1 + '/' + platform;
                execSync(`${__dirname + '/node_modules/.bin/asar'} pack ${folder2} ${path.resolve(__dirname, `script/replace/${version}/${platform}/electron.asar`)}`)

            })
        }

    });
}

main();
