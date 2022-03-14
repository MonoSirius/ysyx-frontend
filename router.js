import { createRouter, createWebHistory } from 'vue-router'
// Compose the router
export const routes = [
	{ path: '/', component: () => import('./src/home.vue') },
	// { url: '//docs.ysyx.org', title: '资料' },
	// { url: '//forum.ysyx.org', title: '论坛' },
	{ path: '/status/:code', component: () => import('./src/status.vue') },
	{ path: '/login', component: () => import('./src/login.vue') },
	{ path: '/register', component: () => import('./src/register.vue') },
	{ path: '/redirect:pathMatch(.*)', component: () => import('./src/redirect.vue') },
	{ path: '/:pathMatch(.*)*', href: '/status/404' },
]
export const router = createRouter({
	history: createWebHistory(),
	routes
})