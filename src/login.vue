<script setup>
import { computed, onActivated, ref, watch } from 'vue'
import useUserStore from '@CS/user'
import { router } from '@/router'
import { useRoute } from 'vue-router'
import guard from '@CL/guard'
import { alert } from '@CC/WinStack.vue'
const [STANDBY, INCOMPLETE, IN_ACTION] = [0, 1, 2],
	inAction = ref(false),
	errorMsg = ref(''),
	login = ref(''),
	loginValid = computed(() => login.value.length >= 5),
	password = ref(''),
	passwordValid = computed(() => password.value.length >= 5),
	state = computed(() => {
		if (inAction.value) return IN_ACTION
		if (errorMsg.value) return INCOMPLETE
		if (!loginValid.value) return INCOMPLETE
		if (!passwordValid.value) return INCOMPLETE
		return STANDBY
	}),
	user = useUserStore(),
	route = useRoute()
watch(login, () => errorMsg.value = '')
watch(password, (str) => errorMsg.value = '')
async function loginAction(onIncomplete = () => {}) {
	if (state.value == STANDBY) {
		inAction.value = true
		// Parse location.search arguments
		errorMsg.value = ''
		const successful = await user.login(
			login.value,
			password.value,
			(msg) => errorMsg.value = msg
		)
		inAction.value = false
		if (successful) {
			if (
				!window?.navigator?.standalone
				&& /Mobile/ig.test(navigator.userAgent)
			) setTimeout(alert(
				'Web App Available',
				'Save this site as a web app to get best experience'
			), 1000);
		} else if (!successful && !errorMsg.value) {
			errorMsg.value = '登录失败: 您填写的信息有误'
		}
	} else {
		onIncomplete()
	}
}
// Redirect upon successful login
guard(
	() => !user.loginState,
	route.query.from
		? decodeURIComponent(route.query.from)
		: '/space/',
	false
)
</script>

<template>
	<container flex-column flex-center align-center flex-grow :pad="false">
		<h2>登录「一生一芯」账号</h2>
		<container
			type="alert"
			style="width: 100%; max-width: 340px; margin: 1rem 0 0 0"
			v-if="errorMsg"
		>
			{{ errorMsg }}
		</container>
		<v-form prompt>
			<label for="login">ID / Email</label>
			<input
				type="text"
				name="login"
				autocomplete="username"
				v-model.trim="login"
				:disabled="state === IN_ACTION"
				@keydown.enter="loginAction(() => $refs.passwordInput.focus())"
				ref="loginInput"
			/>
			<label for="password">密码</label>
			<input
				type="password"
				name="password"
				autocomplete="current-password"
				v-model.trim="password"
				:disabled="state === IN_ACTION"
				@keydown.enter="loginAction(() => $refs.loginInput.focus())"
				ref="passwordInput"
			/>
			<btn
				:type="
					['solid', ['green', 'disabled', 'gray'][state]].join(' ')
				"
				@click="loginAction"
			>
				<span v-if="state == STANDBY">登录</span>
				<span v-else-if="state == IN_ACTION">
					<alternating-dots />
				</span>
				<span v-else>请填写有效的用户名和密码</span>
			</btn>
		</v-form>
	</container>
</template>