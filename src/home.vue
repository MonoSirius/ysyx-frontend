<script setup>
import Slogan from './components/Slogan.vue'
import Actions from './components/Actions.vue'
import Sponsors from './components/Sponsors.vue'
</script>

<template>
	<container flex-column flex-center content-center flex-grow>
		<Slogan />
		<Actions />
	</container>
	<container w1280 title="合作/赞助机构" :next-level="true">
		<Sponsors />
	</container>
	<v-footer />
</template>

<style scoped lang="scss">
/* Logo style */
.logo-container {
	display: flex;
	font-size: min(3rem, 8vw);
	font-weight: bold;
	color: var(--ct-gray-light);
	margin: 2rem 0;
	user-select: none;
	span.quote {
		height: 100%;
		line-height: 1em;
		display: block;
	}
}
</style>