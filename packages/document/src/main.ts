import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

let instance = null

const render = ({ container } = {}) => {
    instance = createApp(App)
    instance.use(createPinia())
    instance.use(router)
    instance.mount(container ? container.querySelector('#app') : '#app')
}

// 如果是单独启动的子文件，保证仍能正常运行
if (!window.__POWERED_BY_QIANKUN__) {
    render()
}


// 生命周期的钩子函数
// 导出第一次进入当前子应用的钩子函数
export async function bootstrap() {
    console.log('第一次进入')
}

// 导出每次创建挂载时的钩子函数
export async function mount(props) {
    console.log("创建挂载组件")
    console.log(props.container)
    render(props)
}

// 导出每次销毁时的钩子函数
export async function unmount(props) {
    console.log("销毁组件")
    instance.unmount()
    instance._container.innerHTML = ''
    instance = null
}

