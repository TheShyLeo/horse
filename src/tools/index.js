import Vue from 'vue'
import electron from 'electron'
import path from 'path' // 通知接口
/** ************************************************************自定义从这开始**************************************************************/
// 引入element的部分组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

const ipcRenderer = electron.ipcRenderer

JSON.handle = function (data) {
  return JSON.parse(JSON.stringify(data))
}

// 引入electron接口
Vue.path = Vue.prototype.$path = path // path接口
Vue.electron = Vue.prototype.$electron = electron // electron
Vue.ipc = Vue.prototype.$ipc = ipcRenderer // ipc接口

// Vue.api = Vue.prototype.$Api = Api // 请求接口
Vue.use(ElementUI)
const MessageBox = ElementUI.MessageBox
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

Vue.prototype.Confirm = options => {
  MessageBox.confirm(options.tips, options.title, {
    confirmButtonText: options.confirmButtonText || '确定',
    cancelButtonText: '取消',
    dangerouslyUseHTMLString: true,
    type: options.type || 'warning'
  })
    .then(() => {
      options.callback()
    })
    .catch(() => {})
}
Vue.prototype.InputConfirm = options => {
  MessageBox.prompt(options.tips, options.title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: options.value || '',
    inputPattern: options.inputPattern || '',
    inputErrorMessage: options.inputErrorMessage || ''
  })
    .then(({ value }) => {
      options.callback(value)
    })
    .catch(() => {})
}
