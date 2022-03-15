<script setup>
import Header from '@CC/Header.vue'
import AppBody from '@CC/Body.vue'
// Loading animation params
import { ref } from 'vue'
const loading = ref(false)
// Router loading animation
import { router } from '../router.js'
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
