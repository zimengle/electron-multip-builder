/**
 * 这里是替换electron的文件的脚本，因为electron打包之后就不能再使用它起一个主进程了，所以需要文件替换一下
 *
 * @author zhangzimeng01
 */
const os = require('os');
const path = require('path');
const fs = require('fs-extra');

function logger(...args) {
    var log4js = require('log4js');
    var logger = log4js.getLogger();
    logger.level = 'info';
    logger.info(...args);
}


function getElectronVersion() {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../node_modules/electron/package.json'), 'utf-8')).version;
}


function replaceElectrion(platform, version) {
    let source;
    switch (platform) {
        case 'mac':
            source = path.resolve(__dirname, '../../node_modules/electron/dist/Electron.app/Contents/Resources/electron.asar');
            break;
        case 'win':
            source = path.resolve(__dirname, '../../node_modules/electron/dist/resources/electron.asar');
            break;
    }
    let target = path.resolve(__dirname, `./${version}/${platform}/electron.asar`);
    fs.copySync(target, source);
}


function main() {

    logger('开始替换electron');

    let electronVersion = getElectronVersion();
    let platform;
    switch (os.platform()) {
        case 'darwin':
            logger('正在替换macOS下的electron文件....');
            platform = 'mac';
            break;
        case 'win32':
            logger('正在替换win32下的electron文件....');
            platform = 'win';
            break;
        default:
            throw Error('不知道该操作系统下的electron');
            break;
    }

    try {
        replaceElectrion(platform, electronVersion);
    } catch (e) {
        throw Error(`没有找到 ${platform}系统下的 ${electronVersion}版本的electron替换文件!`)
    }

    logger('electron文件替换完成...');

}


main();
