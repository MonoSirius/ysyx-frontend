<script setup>
import Container from "@CC/Container.vue";
import Btn from "@CC/Button.vue";
const LUT = {
	403: "您没有访问权限",
	404: "无法找到页面",
	500: "应用内部错误",
};
</script>

<template>
	<Container
		style="
			display: flex;
			flex-grow: 1;
			justify-content: center;
			align-items: center;
		"
	>
		<div style="display: flex; align-items: left; flex-direction: column">
			<h1>{{ $route.params.code }}</h1>
			<h2 v-if="$route.params.code in LUT">
				{{ LUT[$route.params.code] }}
			</h2>
			<span
				style="
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					margin: 1em 0;
				"
			>
				<btn style="font-size: 1.2rem" type="gray brand" to="/">← 返回主页</btn>
			</span>
		</div>
	</Container>
</template>

<style scoped>
* {
	display: block;
	color: var(--ct-gray);
}
h1 {
	font-size: 8rem;
}
h2 {
	font-size: 3rem;
}
</style>