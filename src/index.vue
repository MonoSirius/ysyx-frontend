<script setup>
import Header from '@CC/Header.vue'
import AppBody from '@CC/Body.vue'
import useUserStore from '@CS/user'
import { router } from '../router'
// Loading animation params
import { ref } from 'vue'
const loading = ref(false)
const user = useUserStore()
user.update()
setInterval(() => {
	if (user.loginState) user.update()
}, 60_000)
// Router loading animation
router.beforeEach((to, from, next) => {
	loading.value = true
	next()
})
router.beforeResolve((to, from, next) => {
	loading.value = false
	next()
})
</script>

<template>
	<Header :loading="loading" />
	<AppBody>
		<router-view></router-view>
	</AppBody>
</template>
