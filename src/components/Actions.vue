<script setup>
import Responsive from "@CC/Responsive.vue";
import Btn from "@CC/Button.vue";
</script>

<template>
	<div class="actions">
		<btn type="solid brand" to="/redirect/to/docs.ysyx.org/about/enroll/student.html"
			>立即参与</btn
		>
		<btn type="solid gray" to="/redirect/to/docs.ysyx.org/about/about.html"
			>了解详情</btn
		>
		<btn type="solid gray disabled">赞助</btn>
	</div>
</template>

<style scoped>
.actions {
	width: 100%;
	max-width: 32em;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	margin: 1rem 0;
}
.actions > * {
	margin: 0.5rem;
	font-size: 16px;
}
</style>