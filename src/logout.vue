<script setup>
import useUserStore from '@CS/user'
import { useRoute } from 'vue-router'
import { router } from '@/router'
import { onMounted, ref, watch } from 'vue'
const route = useRoute(),
	user = useUserStore(),
	errorMsg = ref('')
watch(() => user.loginState, loginState => {
	if (!loginState) router.push(router.resolve('/'))
})
onMounted(async () => {
	user.logout(msg => errorMsg.value = msg)
	if (!user.loginState) router.push(router.resolve('/'))
})
</script>

<template>
	<div
		style="
			position: absolute;
			top: calc(50% - 50px);
			left: calc(50% - 50px);
			width: 100px;
			height: 100px;
			font-size: 100px;
		"
		v-if="!errorMsg"
	>
		<chasing-circle style="opacity: 0.3" />
	</div>
	<container v-else flex flex-column flex-center flex-grow :pad="false">
		<container
			type="alert"
			style="width: 100%; max-width: 340px; margin: 1rem 0 0 0"
		>
			{[errorMsg]}
		</container>
		<btn type="solid gray" to="/redirect/logout">重试</btn>
	</container>
</template>