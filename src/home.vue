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
	<container w1280 flex-grow title="合作/赞助机构" :next-level="true">
		<Sponsors />
	</container>
	<v-footer />
</template>
