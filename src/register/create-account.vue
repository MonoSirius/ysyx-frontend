<script setup>
import Container from '@CC/Container.vue'
import Btn from '@CC/Button.vue'
import vForm from '@CC/Form.vue'
import VueCountdown from '@chenfengyuan/vue-countdown'
import AlternatingDots from '@CC/spinners/AlternatingDots.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRegisterStore, callRegisterApi } from '../register.vue'
const [PENDING, YES, NO] = [0, 1, 2],
	inAction = ref(false),
	errorMsg = ref(null),
	confirmPwd = ref(''),
	eligible = ref(PENDING),
	ready = computed(
		() =>
			eligible.value == YES &&
			store.passwordValid &&
			store.password == confirmPwd.value
	),
	buttonType = computed(() => {
		if (inAction.value) return 'solid gray'
		if (ready.value) return 'solid green'
		return 'solid disabled'
	}),
	emit = defineEmits(['next']),
	store = useRegisterStore()
async function submit() {
	if (ready.value && !inAction.value) {
		errorMsg.value = ''
		inAction.value = true
		if (await store.register((msg) => (errorMsg.value = msg))) {
			emit('next')
		} else {
			inAction.value = false
		}
	}
}
// asynchronously check ID availability
const check = async (userID = store.userID) => {
	eligible.value = PENDING
	const result = await store.checkUserID()
	if (store.userID == userID) eligible.value = result ? YES : NO
}
watch(() => store.userID, check)
check()
</script>

<template>
	<container
		flex-column
		flex-center
		align-center
		flex-grow
		:pad="false"
		:frame="true"
	>
		<h2>创建「一生一芯」账号</h2>
		<container
			type="alert"
			v-if="errorMsg"
			style="width: 100%; max-width: 340px; margin: 1rem 0 0 0"
		>
			{{ errorMsg }}
		</container>
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
				<span
					alert-text
					v-else-if="store.userIDValid && eligible == NO"
					>{{ store.checkResult }}</span
				>
				<alternating-dots
					info-text
					v-else-if="store.userIDValid && eligible == PENDING"
				/>
				<span success-text v-else-if="eligible == YES">该 ID 可用</span>
			</label>
			<input
				type="text"
				name="userID"
				autocomplete="username"
				v-model.trim="store.userID"
				:disabled="inAction"
				@keydown.enter="$refs.userName.focus()"
			/>
			<label for="userName">姓名 (可选)</label>
			<input
				type="text"
				ref="userName"
				name="userName"
				autocomplete="name"
				v-model.trim="store.userName"
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
				<span
					alert-text
					v-if="confirmPwd && store.password !== confirmPwd"
					>两次输入的密码不一致</span
				>
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
			<btn :type="buttonType" @click="submit">
				<span v-if="ready && !inAction">注册</span>
				<span
					v-else-if="inAction"
					style="display: flex; align-items: center"
				>
					<alternating-dots />
				</span>
				<span v-else>请填写有效的 ID 和密码</span>
			</btn>
		</v-form>
	</container>
</template>