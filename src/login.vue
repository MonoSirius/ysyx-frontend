<script setup>
import Container from '@CC/Container.vue'
import Btn from '@CC/Button.vue'
import vForm from '@CC/Form.vue'
import AlternatingDots from '@CC/spinners/AlternatingDots.vue'
import { onActivated, ref, watch } from 'vue'
import useUserStore from '@CS/user'
import { router } from '@/router'
import { useRoute } from 'vue-router'
const [STANDBY, INCOMPLETE, IN_ACTION] = [0, 1, 2],
	state = ref(INCOMPLETE),
	errorMsg = ref(''),
	login = ref(''),
	loginValid = ref(false),
	password = ref(''),
	passwordValid = ref(false),
	user = useUserStore()
watch(login, (str) => {
	loginValid.value = str.length >= 5
	if (state.value == STANDBY) {
		errorMsg.value = ''
	}
})
watch(password, (str) => {
	passwordValid.value = str.length >= 5
	if (state.value == STANDBY) {
		errorMsg.value = ''
	}
})
watch(loginValid, (bool) => {
	changeState({ loginValid: bool })
})
watch(passwordValid, (bool) => {
	changeState({ passwordValid: bool })
})
function changeState({
	_login = loginValid.value,
	_password = passwordValid.value,
}) {
	if (state.value != IN_ACTION) {
		state.value = _login && _password ? STANDBY : INCOMPLETE
	}
}
async function loginAction(onIncomplete = () => {}) {
	if (state.value == STANDBY) {
		state.value = IN_ACTION
		// Parse location.search arguments
		errorMsg.value = ''
		const successful = await user.login(
			login.value,
			password.value,
			(msg) => errorMsg.value = msg
		)
		if (!successful && !errorMsg.value) {
			errorMsg.value = '登录失败: 您填写的信息有误'
			state.value = INCOMPLETE
		}
	} else {
		onIncomplete()
	}
}
// Redirect upon successful login
const onLogin = () => router.push(router.resolve(`/user/${user.userID}/`))
watch(() => user.loginState, state => {
	if (state) onLogin()
})
if (user.loginState) onLogin()
</script>

<template>
	<container flex flex-column flex-center flex-grow :pad="false">
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