import { join } from 'path'
import { Injectable } from '@nestjs/common'
import { BrowserWindow, app } from 'electron'
import { IS_DEV } from '@main/config'
import express from 'express'

@Injectable()
export class AppService {
  public mainWindow: BrowserWindow

  public async initApp() {
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin')
        app.quit()
    })
    if (IS_DEV) {
      if (process.platform === 'win32') {
        process.on('message', (data) => {
          if (data === 'graceful-exit')
            app.quit()
        })
      }
      else {
        process.on('SIGTERM', () => {
          app.quit()
        })
      }
    }
    app.on('activate', () => {
      this.mainWindow.show()
    })
    app.on('before-quit', () => {
      this.mainWindow.removeAllListeners()
    })

    await app.whenReady()
    this.startLocalServer()

    this.mainWindow = new BrowserWindow({
      width: 1000,
      height: 600,
      minWidth: 1000,
      minHeight: 600,
      webPreferences: {
        webviewTag: true,
        nodeIntegration: false,
        contextIsolation: true,
        preload: join(__dirname, '../preload/index.js'),
        devTools: IS_DEV,
      },
      autoHideMenuBar: !IS_DEV,
    })

    this.mainWindow.on('close', (e) => {
      e.preventDefault()
      this.mainWindow.hide()
    })

    const URL = IS_DEV
      ? process.env.DEV_SERVER_URL
      : `file://${join(app.getAppPath(), 'dist/render/index.html')}`

    this.mainWindow.loadURL(URL)

    if (IS_DEV)
      this.mainWindow.webContents.openDevTools()
    else
      this.mainWindow.removeMenu()
  }

  private startLocalServer() {
    const server = express()
    server.use(express.static(app.getPath('downloads')))
    server.listen(26111, () => console.log('Local server start!'))
  }
}
