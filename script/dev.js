// 获取命令行参数
const args = process.argv;
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');


// 输出除了前两个元素（Node.js可执行文件路径和脚本文件路径）外的参数
const commandLineArgs = args.slice(2);


const getAllSubdirectories = (dirPath) => {
    return fs.readdirSync(dirPath)
        .filter(file => fs.statSync(dirPath + '/' + file).isDirectory());
};

const packDir = path.join(__dirname, '../packages')

const startApp = (app) => {
     // 启动一个shell来执行这个命令
     const terminal = spawn(process.platform === 'win32' ? 'cmd' : 'bash', [process.platform === 'win32' ? '/c' : '-c', `cd ${packDir}/${app} && npm run dev`]);

    terminal.stdout.pipe(process.stdout);
    terminal.stderr.pipe(process.stderr);

    terminal.on('exit', (code) => {
        console.log(`终端已退出，退出码: ${code}`);
    });
}

const subDirectories = getAllSubdirectories(packDir);
console.log("所有子文件夹：", subDirectories);


// 没有要构建的子应用的信息，把packages包下的所有应用都构建了
if (commandLineArgs.length === 0) {
    for (let app of subDirectories) {
        // 启动一个shell来执行这个命令
        startApp(app)
    }
} else {
    const app = commandLineArgs[0]
    if (commandLineArgs.includes(app)) {
        startApp(app)
    } else {
        console.error('应用未找到')
    }
}
