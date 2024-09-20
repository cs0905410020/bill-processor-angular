const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const server = require('./server');
const macaddress = require('macaddress');
const axios = require('axios');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
// Create the browser window.
  win = new BrowserWindow({width: 1200, height: 900})
  macaddress.one(function (err, mac) {
    console.log("Mac address for this host: %s", mac);
    axios.get(`http://159.89.162.152:8081/api/user/isAuthorized/${mac}`)
        .then(response => {
          if(!response.data)
            app.exit();
        })
        .catch(error => {
          if (error) {
            console.log(error)
            app.exit();
            return console.log(error);
          }
        });

  });


// and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/bill-processor/browser/index.html'),
    protocol: 'file:',
    slashes: true
  }))

// Open the DevTools.
//win.webContents.openDevTools()

// Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
// On macOS it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.​
// Replace with
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit(); // Exit if another instance is already running
}
