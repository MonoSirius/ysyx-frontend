<script setup>
import WinStack from '@CC/WinStack.vue'
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
	<v-header :loading="loading" />
	<WinStack />
	<v-body>
		<router-view></router-view>
	</v-body>
</template>
