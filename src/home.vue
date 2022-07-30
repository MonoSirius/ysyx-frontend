<script setup>
import Slogan from './components/Slogan.vue'
import Actions from './components/Actions.vue'
import Sponsors from './components/Sponsors.vue'
</script>

<template>
	<container flex-row flex-center content-center class="logo-container" :pad="false">
		<span class="quote">「</span>
		<img alt="YSYX logo" class="logo" src="@CR/logo/line.png" />
		<span class="quote">」</span>
		<span class="text">计划</span>
	</container>
	<div class="divider"></div>
	<container flex-column flex-center content-center>
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
	/* logo size and position */
	.logo {
		height: 1.2em;
		margin: 0 0.5em;
	}
}
/* Dark theme saturates the logo */
html.light .logo {
	filter: contrast(0.8) brightness(140%);
}
html.dark .logo {
	filter: contrast(0.8) brightness(180%);
}
/* divider */
.divider {
	height: 1px;
	background-color: var(--cb-gray-light);
}
</style>