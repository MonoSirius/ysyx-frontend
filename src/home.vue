<script setup>
import Container from '@CC/Container.vue'
import Footer from '@CC/Footer.vue'
import Slogan from './components/Slogan.vue'
import Actions from './components/Actions.vue'
import Sponsors from './components/Sponsors.vue'
defineProps({ scrollTop: Number })
</script>

<template>
	<container
		style="
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		"
	>
		<Slogan />
		<Actions />
	</container>
	<container w1280 title="合作/赞助机构" :next-level="true">
		<Sponsors :scrollTop="scrollTop" />
	</container>
	<Footer />
</template>
