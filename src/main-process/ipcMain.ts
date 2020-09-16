import { ipcMain, app } from "electron";

ipcMain.on("ping", (event, arg) => {
  console.log("reacting to ping message with value", arg);
  event.returnValue = arg + 1;
});


ipcMain.on("close-app", (event, arg) => {
  app.quit();
});
