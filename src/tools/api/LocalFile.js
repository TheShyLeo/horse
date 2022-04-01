// import electron from 'electron'
import fs from 'fs'
const productName = 'horse'
const { app,remote } = require('electron')
console.log(process.type)
let APP = process.type === 'renderer' ? remote.app : app
console.log(APP)
let STORE_PATH = APP.getPath('userData')
export default {
  address:  '/horse/',
  user: '',
  debug: process.env.NODE_ENV === 'development',
  folders: {},
  files: {}, // 用户本地文件对象
  char26() {
    let ch_small = 'a'
    let str = ''
    let ch_big = 'A'
    for (let i = 0; i < 26; i++) {
      str += String.fromCharCode(ch_small.charCodeAt(0) + i) + String.fromCharCode(ch_big.charCodeAt(0) + i)
    }
    return str
  },
  log(message) {
    this.debug && console.info(message)
  },
  init(user, callback) {
    this.user = user
    this.folderVerify(this.address, () => {
      this.folders = {
        basic: this.address + productName,
        user: this.address + productName + '/' + user
      }
      this.files = {
        login: this.folders.basic,
        user: this.folders.user,
        download: this.folders.user,
        setting: this.folders.user,
        'local-music': this.folders.basic,
        key: this.folders.basic,
        __map__: this.folders.basic
      }
      let foldersMap = []
      let i = 0
      for (let folder in this.folders) {
        foldersMap.push(this.folders[folder])
      }
      this.createFolder(foldersMap, i, () => {
        this.log(productName + '文件夹初始化完成')
        for (let file in this.files) {
          this.files[file] = this.files[file] + '/' + file + '.json'
          if (file === '__map__') {
            fs.writeFile(this.files[file], JSON.stringify(this.files), () => {
              this.log('创建' + this.files[file])
            })
          } else {
            fs.appendFileSync(this.files[file], '')
          }
        }
        callback && callback()
      })
    })
  },
  createFolder(map, index, callback) {
    this.folderVerify(map[index], () => {
      if (index !== map.length - 1) {
        index++
        this.createFolder(map, index, callback)
      } else {
        callback && callback()
      }
    })
  },
  folderVerify(url, callback) {
    fs.access(url, fs.constants.F_OK | fs.constants.W_OK, err => {
      err
        ? fs.mkdir(url, () => {
          callback && callback()
        })
        : callback && callback()
    })
  },
  getMap(type) {
    if (this.files[type]) {
      return this.files
    }
    try {
      return JSON.parse(fs.readFileSync(this.address + productName + '/__map__.json'))
    } catch (e) {
      return false
    }
  },
  read(type, callback) {
    this.files = this.getMap(type)
    this.log('读取' + this.files[type])
    if (!this.files) {
      return callback(null, callback, 1)
    }
    fs.readFile(this.files[type], { flag: 'r+', encoding: 'utf8' }, (err, data) => {
      try {
        data = JSON.parse(data)
      } catch (e) {
        data = {}
      }
      callback && callback(data, err)
    })
  },
  write(type, data, callback) {
    this.log('写入' + this.files[type])
    data = JSON.stringify(data)
    if (type === 'key') {
      let char26 = this.char26()
      data = encrypt.encode(data, data + char26, data + char26)
    }
    fs.writeFile(this.files[type], data, err => {
      callback && callback(data, err)
    })
  }
}
