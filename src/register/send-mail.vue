<script setup>
import Container from '@CC/Container.vue'
import Btn from '@CC/Button.vue'
import vForm from '@CC/Form.vue'
import VueCountdown from '@chenfengyuan/vue-countdown'
import AlternatingDots from '@CC/spinners/AlternatingDots.vue'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { callRegisterApi, useRegisterStore } from '../register.vue'
const inAction = ref(false),
	coolDown = ref(false),
	errorMsg = ref(null),
	buttonType = computed(() => {
		if (
			store.mailValid &&
			!coolDown.value &&
			!inAction.value
		) return 'green'
		return 'disabled'
	}),
	emit = defineEmits(['next']),
	store = useRegisterStore()
function submit() {
	if (store.mailValid) {
		inAction.value = true
		errorMsg.value = null
		store
			.sendMail()
			.then(async (res) => {
				switch (res.status) {
					case 200:
						emit('next')
					default:
						errorMsg.value = await res.text()
						coolDown.value = res.status >= 500
				}
			})
			.catch(() => {
				errorMsg.value = '请求失败, 请稍后重试'
				coolDown.value = true
			})
			.then(() => (inAction.value = false))
	}
}
</script>

<template>
	<container
		flex
		flex-column
		flex-center
		flex-grow
		:pad="false"
		:frame="true"
	>
		<h2>请填写您的邮箱</h2>
		<container
			type="message"
			style="width: 100%; max-width: 340px; margin: 1rem 0 0 0"
		>
			您提供的邮箱是我们与您联系的主要途径, 建议填写最常用的邮箱
		</container>
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
				autocomplete="email"
				v-model.trim="store.mail"
				:disabled="inAction"
				@keydown.enter="$refs.checkbox.focus()"
			/>
			<span selection-group>
				<label>
					<input type="checkbox" checked disabled />
					接收关键通知 (面试、分组、流片等)
				</label>
				<label>
					<input
						type="checkbox"
						name="allowAd"
						v-model.trim="store.allowAd"
						ref="checkbox"
						:disabled="inAction"
						@keypress.space="$refs.checkbox.click()"
						@keydown.enter="submit()"
					/>
					接收一生一芯宣讲会、讲座等活动通知
				</label>
			</span>
			<btn :type="['solid', buttonType].join(' ')" @click="submit">
				<span v-if="store.mailValid && !inAction">发送验证邮件</span>
				<alternating-dots v-else-if="inAction" />
				<vue-countdown
					v-else-if="coolDown"
					:time="60000"
					@end="coolDown = false"
					v-slot="{ totalSeconds }"
					>发送验证邮件 ({{ totalSeconds }}s)</vue-countdown
				>
				<span v-else>请填写有效的邮箱地址</span>
			</btn>
		</v-form>
	</container>
</template>