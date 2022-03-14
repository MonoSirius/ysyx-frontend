<script setup>
import Spinner from "@CC/Spinner.vue";
import { useRoute } from "vue-router";
import { router } from "@/router.js";
import { onMounted, ref } from "vue";
const route = useRoute(),
	link = ref(null);
onMounted(async () => {
	if ("fulfilled" in route.query) {
		router.go(-2);
	} else {
		router.push(route.path + '?fulfilled')
		window.location.href = route.params.pathMatch.replace(/^\/to\//ig, '//')
	}
});
</script>

<template>
	<div
		style="
			position: absolute;
			top: calc(50% - 50px);
			left: calc(50% - 50px);
			width: 100px;
			height: 100px;
			font-size: 100px;
		"
	>
		<Spinner style="opacity: 0.3" />
	</div>
</template>