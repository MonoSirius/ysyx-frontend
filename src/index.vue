<script setup>
import WinStack from '@CC/WinStack.vue'
import useUserStore from '@CS/user'
import NavLink from '@CC/header/NavLink.vue'
import UserBadge from '@CC/header/UserBadge.vue'
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
	<v-header :loading="loading" #nav="{navData}">
	<nav-link
				:disabled="navData.redirecting"
				@active="navData.activeTitle"
				to="/"
				title="主页"
				><i class="fa fa-home"></i>主页</nav-link
			>
			<nav-link
				:disabled="navData.redirecting"
				@active="navData.activeTitle"
				to="/post"
				title="公告列表"
				><i class="fa fa-bullhorn"></i>公告</nav-link
			>
			<nav-link
				:disabled="navData.redirecting"
				@active="navData.activeTitle"
				to="/redirect/docs/"
				title="项目资料"
				>项目资料</nav-link
			>
			<nav-link
				:disabled="navData.redirecting"
				@active="navData.activeTitle"
				to="/redirect/forum/"
				title="讨论区"
				>讨论区</nav-link
			>
			<nav-link
				:disabled="navData.redirecting"
				@active="navData.activeTitle"
				to="/redirect/to/docs.qq.com/sheet/DT29weHpIRWNnYlFl?tab=BB08J2"
				title="学习记录"
				><i class="fa fa-link"></i>学习记录</nav-link
			>
			<nav-link
				:disabled="navData.redirecting"
				@active="navData.activeTitle"
				v-if="!user.loginState"
				to="/register"
				title="注册"
				>注册</nav-link
			>
			<nav-link
				:disabled="navData.redirecting"
				@active="navData.activeTitle"
				v-if="!user.loginState"
				to="/login"
				title="登录"
				>登录</nav-link
			>
			<nav-link
				:disabled="navData.redirecting"
				@active="navData.activeTitle"
				v-if="user.loginState"
				to="/space"
				title="个人空间"
				>个人空间</nav-link
			>
			<user-badge
				:disabled="navData.redirecting"
				@active="navData.activeTitle"
				v-if="user.loginState"
			/>
	</v-header>
	<WinStack />
	<v-body>
		<router-view></router-view>
	</v-body>
</template>
