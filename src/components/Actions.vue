<script setup>
</script>

<template>
	<div class="actions">
		<btn type="solid brand" to="/redirect/docs/about/enroll/student.html"
			>立即参与</btn
		>
		<btn
			type="solid gray-brand"
			href="https://docs.qq.com/sheet/DT29weHpIRWNnYlFl?tab=BB08J2"
			target="_blank"
			><i class="fa fa-link"></i>&nbsp;学习记录</btn
		>
		<btn type="solid gray disabled">赞助</btn>
	</div>
</template>

<style scoped lang="scss">
.actions {
	width: 100%;
	max-width: 42em;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-evenly;
	margin: 1rem 0;
}
.actions > * {
	margin: 0.5rem;
	font-size: 16px;
	flex-grow: 1;
	max-width: 8em;
	@media (min-width: 720px) {
		font-size: 1.2em;
	}
}
</style>