<script setup>
import Container from "@CC/Container.vue";
import Btn from "@CC/Button.vue";
import { router } from "@/router.js";
const emit = defineEmits(["next"]);
function goBack() {
	router.replace({ path: "/register" });
	emit("next");
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
		<h2>邮箱验证链接已失效</h2>
		<Container
			type="warn"
			class="green"
			style="width: 100%; max-width: 340px; margin: 1rem 0 0 0"
		>
			<p>
				您的验证链接无法通过校验, 这可能是由于验证链接已超时,
				或者由于链接被篡改。
			</p>
		</Container>
		<Container
			type="message"
			style="width: 100%; max-width: 340px; margin: 1rem 0"
		>
			如果在注册阶段反复遇到问题, 您可以联系
			<btn type="link" href="mailto:support@ysyx.org">技术支持</btn>
		</Container>
		<Btn type="solid gray" @click="goBack">← 重新发送验证邮件</Btn>
	</Container>
</template>