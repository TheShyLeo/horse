'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import LocalFile from './tools/api/LocalFile'
import { request, connect, authenticate } from 'league-connect'
const isDevelopment = process.env.NODE_ENV !== 'production'
let credentials = {};

app.commandLine.appendSwitch('ignore-certificate-errors')
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

async function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1200,
        height: 700,
        frame: false,
        webPreferences: {
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: true,
            enableRemoteModule: true,// 开启远程模块 这个配置了之后就可以使用require('electron').remote
            contextIsolation: false
        }
    })

    //解决跨域
    win.webContents.session.webRequest.onBeforeSendHeaders(
        (details, callback) => {
            callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } });
        },
    );

    win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                'Access-Control-Allow-Origin': ['*'],
                ...details.responseHeaders,
            },
        });
    });
    let t1 = new Date().getTime()
    credentials = await authenticate({ awaitConnection: true });
    console.log(new Date().getTime() - t1)
    let webContents = win.webContents;
    webContents.on('did-finish-load', () => {
        console.log('did-finish-load')
        webContents.send('auth', credentials);
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode  
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }
}

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
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    createWindow()
    LocalFile.init()
})

// Exit cleanly on request from parent process in development mode.              
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
