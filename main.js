const {app, BrowserWindow,ipcMain,dialog } = require("electron");
const ci = require('miniprogram-ci')
const isDev = require("electron-is-dev");
let mainWindow;
app.on('ready',()=>{
    require('devtron').install();
    mainWindow = new BrowserWindow({
        width:1024,
        height:680,
        webPreferences:{
            nodeIntegration:true
        }
    })
    const urlLoad = isDev ? 'http://localhost:3000' : 'dur';
    mainWindow.loadURL(urlLoad);
    mainWindow.webContents.openDevTools()
    initEvent(ipcMain)

}) 
//监听渲染进程
function initEvent(ipcMain){
    ipcMain.on('openFile', (event, arg) => {
        openDialog(event)
    })
    ipcMain.on('preView', (event, arg) => {
        minCodePreView(event,arg)
    })
    
 
}
//打开窗体信息
function openDialog(event){
    
   dialog.showOpenDialog({ properties: ['openDirectory','multiSelections'] }).then(res=>{
    event.reply('selectFile', res)
   }).catch(err=>{
    event.reply('selectFile', [])
   });
   
}
//小程序预览
function minCodePreView(event,arg){
    const project = new ci.Project({
        appid: arg.appid,
        type:  arg.type||'miniProgram',
        projectPath:  arg.projectPath,
        privateKeyPath: 'the/path/to/privatekey',
        ignores: ['node_modules/**/*'],
      })
}