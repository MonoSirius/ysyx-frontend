import '@CR/global.css'
import '@CR/fa/all.min.css'
// Mount app
import { createApp, onMounted } from 'vue'
import App from './src/index.vue'
import { router } from './router.js'
import { createPinia } from 'pinia'
createApp(App)
	.use(router)
	.use(createPinia())
	.mount('#app')