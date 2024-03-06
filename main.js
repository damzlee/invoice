const { app, BrowserWindow } = require('electron/main')
const server = require("./server");
const cors = require('cors');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadURL( 'http://localhost:5555/');

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})