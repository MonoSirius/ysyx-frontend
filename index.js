/* eslint-env node, browser */
import '@CR/global.css'
import '@CR/fa/all.min.css'
// Mount app
import { createApp, onMounted } from 'vue'
import App from './src/index.vue'
import { router } from './router'
import { createPinia } from 'pinia'
import * as componentList from '@CL/components'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
const Vue = createApp(App)
	.use(router)
	.use(createPinia())
	.use(Antd)
Object
	.entries(componentList)
	.forEach(([name, el]) => Vue.component(name, el))
Vue.mount('#app')
import * as fn from '@CC/WinStack.vue'
window.fn = fn