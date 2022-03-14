<script setup>
import Container from "@CC/Container.vue";
import Btn from "@CC/Button.vue";
import vForm from "@CC/Form.vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useRegisterStore } from "../register.vue";
const inAction = ref(false),
	coolDown = ref(false),
	errorMsg = ref(null),
	confirmPwd = ref(""),
	ready = computed(
		() =>
			store.userIDValid &&
			store.passwordValid &&
			store.password == confirmPwd.value
	),
	buttonType = computed(() => {
		if (inAction.value) return "gray";
		if (store.passwordValid && !coolDown.value) return "green";
		return "disabled";
	}),
	emit = defineEmits(["next"]),
	store = useRegisterStore();
function submit() {
	if (state.value == STANDBY) {
		state.value = IN_ACTION;
		new Promise((res, rej) => {
			setTimeout(() => {
				emit("next");
				res();
			}, 1000);
		}).then(() => 0);
	}
}
</script>

<template>
	<Container
		flex
		flex-column
		flex-center
		flex-grow
		:pad="false"
		:frame="true"
	>
		<h2>创建一生一芯账号</h2>
		<v-form prompt>
			<label for="email">Email</label>
			<input
				type="text"
				name="email"
				v-model.trim="store.mail"
				disabled
			/>
			<label for="userID"
				>账号 ID
				<span alert-text v-if="store.userID && !store.userIDValid"
					>非法的用户名</span
				>
			</label>
			<input
				type="text"
				name="userID"
				autocomplete="username"
				v-model.trim="store.userID"
				:disabled="inAction"
				@keydown.enter="$refs.password.focus()"
			/>
			<label for="password"
				>密码
				<span alert-text v-if="store.password && !store.passwordValid"
					>密码长度过短</span
				>
			</label>
			<input
				ref="password"
				type="password"
				name="password"
				autocomplete="new-password"
				v-model.trim="store.password"
				:disabled="inAction"
				@keydown.enter="$refs.confirmPassword.focus"
			/>
			<label for="confirm-password"
				>确认密码
				<span alert-text v-if="confirmPwd && store.password !== confirmPwd">两次输入的密码不一致</span>
			</label>
			<input
				ref="confirmPassword"
				type="password"
				name="confirm-password"
				autocomplete="confirm-password"
				v-model.trim="confirmPwd"
				:disabled="inAction"
				@keydown.enter="submit"
			/>
			<btn
				:type="
					['solid', ['green', 'disabled', 'gray'][state]].join(' ')
				"
				@click="submit"
			>
				<span v-if="ready">注册</span>
				<span v-else-if="inAction">正在为您创建账户 ...</span>
				<span v-else>请填写有效的 ID 和密码</span>
			</btn>
		</v-form>
	</Container>
</template>