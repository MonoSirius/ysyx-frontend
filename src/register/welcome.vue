<script setup>
import Container from "@CC/Container.vue";
import Btn from "@CC/Button.vue";
import vForm from "@CC/Form.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const [STANDBY, INCOMPLETE, IN_ACTION] = [0, 1, 2],
	state = ref(INCOMPLETE),
	login = ref(""),
	loginValid = ref(false),
	password = ref(""),
	passwordValid = ref(false);
watch(login, (str) => {
	loginValid.value = str.trim().length >= 5;
});
watch(password, (str) => {
	passwordValid.value = str.trim().length >= 5;
});
watch(loginValid, (bool) => {
	changeState({ loginValid: bool });
});
watch(passwordValid, (bool) => {
	changeState({ passwordValid: bool });
});
function changeState({
	_login = loginValid.value,
	_password = passwordValid.value,
}) {
	console.log({
		_login,
		_password,
	});
	if (state.value != IN_ACTION)
		state.value = _login && _password ? STANDBY : INCOMPLETE;
}
const route = useRoute();
function loginAction() {
	if (state.value == STANDBY) {
		state.value = IN_ACTION;
		new Promise((res, rej) => {
			setTimeout(() => {
				res();
			}, 1000);
		}).then(() => (state.value = STANDBY));
	}
}
</script>

<template>
	<Container flex flex-column flex-center flex-grow :pad="false">
		<h2>注册 “一生一芯” 账号</h2>
		<Container
			type="alert"
			style="width: 100%; max-width: 340px; margin: 1rem 0 0 0"
			v-if="loginAttemptFailed"
		>
			登录失败: 您填写的信息有误
		</Container>
		<v-form prompt>
			<label for="login">ID / Email</label>
			<input
				type="text"
				name="login"
				autocomplete="username"
				v-model.trim="login"
				:disabled="state === IN_ACTION"
				@keydown.enter="
					if (state == STANDBY) loginAction();
					else $refs.pwd.focus();
				"
			/>
			<label for="password">密码</label>
			<input
				type="password"
				name="password"
				autocomplete="current-password"
				v-model.trim="password"
				:disabled="state === IN_ACTION"
				@keydown.enter="loginAction()"
				ref="pwd"
			/>
			<btn
				:type="
					['solid', ['green', 'disabled', 'gray'][state]].join(' ')
				"
				@click="loginAction"
			>
				<span v-if="state == STANDBY">登录</span>
				<span v-else-if="state == IN_ACTION">登录中 ...</span>
				<span v-else>请填写有效的用户名和密码</span>
			</btn>
		</v-form>
	</Container>
</template>