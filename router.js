import { createRouter, createWebHistory } from 'vue-router'
// Compose the router
/**
 * @type {import('vue-router').RouteRecordRaw[]}
 */
export const routes = [{
	path: '/',
	component: () => import('./src/home.vue'),
	meta: { title: '一生一芯计划' },
}, {
	path: '/login',
	meta: { title: '用户登录 | 一生一芯计划' },
	component: () => import('./src/login.vue')
}, {
	path: '/register',
	meta: { title: '用户注册 | 一生一芯计划' },
	component: () => import('./src/register.vue')
}, {
	path: '/redirect:pathMatch(.*)',
	// meta: { title: 'Redirect' },
	component: () => import('./src/redirect.vue')
}, {
	path: '/status/:code',
	alias: '/:pathMatch(.*)',
	meta: {
		/**
		 * @param {import('vue-router').RouteLocationNormalized} to 
		 * @returns {String}
		 */
		title: to => `${to.params.code || '404'} | 一生一芯计划`
	},
	component: () => import('./src/status.vue')
}]

export const router = createRouter({
	history: createWebHistory(),
	routes
})

router.afterEach((to) => {
	const title = to?.meta?.title
	if (typeof title === 'string')
		// eslint-disable-next-line no-undef
		document.title = title
	else if (typeof title === 'function')
		// eslint-disable-next-line no-undef
		document.title = title(to)
})