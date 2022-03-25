<script setup>
import Container from '@CC/Container.vue'
import VueCountdown from '@chenfengyuan/vue-countdown'
import Btn from '@CC/Button.vue'
import { useRegisterStore } from '../register.vue'
import { ref } from 'vue'
const registerStore = useRegisterStore(),
	coolDown = ref(true)
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
		<h2>邮件已发送</h2>
		<container
			type="info"
			class="green"
			style="width: 100%; max-width: 340px; margin: 1rem 0 0 0"
		>
			<p>
				我们已经向
				{{ registerStore.mail }}
				发送了一封附有验证链接的邮件,
				请按照邮件内的说明完成后续注册步骤。
			</p>
			<p>如果没有收到邮件, 请检查您邮箱的拦截记录。</p>
		</container>
		<container
			type="message"
			style="width: 100%; max-width: 340px; margin: 1rem 0"
		>
			如果在注册阶段反复遇到问题, 您可以联系
			<btn type="link" href="mailto:support@ysyx.org">技术支持</btn>
		</container>
		<btn
			:type="['solid', coolDown ? 'disabled' : 'gray'].join(' ')"
			:to="coolDown ? undefined : '/redirect/register'"
			>重新发送<vue-countdown
				v-if="coolDown"
				:time="60000"
				@end="coolDown = false"
				v-slot="{ totalSeconds }"
				>({{ totalSeconds }}s)</vue-countdown
			>
		</btn>
	</container>
</template>