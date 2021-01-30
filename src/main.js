const { app, BrowserWindow, Menu, globalShortcut, protocol } = require("electron");
import Path from 'path'
import { ipcMain } from "electron";
import Config from './config.main'
import "./main-process/ipcMain";
const homedir = require('os').homedir();
let config;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

import { Command } from 'commander';
const isDevelopment = process.env.NODE_ENV !== 'production';
const program = new Command()
program.version(require('../package.json').version);

console.log('ARGV=', process.argv);
program
  .option('-d, --debug', 'enable debugging')
  .option('-p, --profile-dir <directory>', 'Custom profile directory')
  .option('-D, --dev', 'Enable the use of Dev Profile (.hurry-dev)')
  .option('--no-sandbox', 'Neede to run as root under linux');

program.parse(process.argv);
program.dev = program.dev || isDevelopment;
if (program.profileDir){ config = Config(program.profileDir) }
else if (program.dev || isDevelopment){ config = Config(Path.join(homedir, '.hurry-dev')) }
else { config = Config(Path.join(homedir, '.hurry')) }

ipcMain.on("getCommandLineParameters", (event, arg) => {
  console.log('GetCLIParameters ==> ', program, program.dev, program.debug)
  event.returnValue = program;
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.yarn 

let mainWindow;
Menu.setApplicationMenu(false);
const createWindow = () => {
  // Create the browser window.

  // fullscreen: true,
  // width: 800,
  // height: 600,
  mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  show: true,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + "/preload.js"
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  console.log("Debug Mode:", program.debug);
  if (isDevelopment || program.debug) {
    // Open the DevTools.
    console.log("Enable Dev Tools");
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);
app.on('ready', registerShortcut);

app.on('ready', () => {
  protocol.registerFileProtocol('plugin', (request, callback) => {
    const url = request.url.substr(9)
    callback({ path: Path.normalize(`${config.pluginsPath}/${url}`) })
  })
})

function registerShortcut() {
  // Enregistrer un écouteur de raccourci 'CommandOrControl+X'.
  const ret = globalShortcut.register('CommandOrControl+Shift+Capslock', () => {
    console.log('CommandOrControl+X is pressed')
    mainWindow.show();
  })

  if (!ret) {
    console.log('enregistrement échoué')
  }

  // Check si le raccourci est enregistré.
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
}
// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
