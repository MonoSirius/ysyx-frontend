<script setup>
import { ref } from 'vue';
defineProps({
	userID: String
})
const data = ref(randInit())
function randInit() {
	const d = []
	for (const i in [...Array(28).keys()]) {
		const w = []
		for (const j in [...Array(7).keys()]) {
			w.push(Math.random())
		}
		d.push(w)
	}
	return d
}
</script>
<template>
	<div graph flex-row>
		<div flew-column week v-for="(w, i) of randInit()" :key="i">
			<div day v-for="(d, j) of w" :key="j" :style="{filter: `saturate(${d})`}"></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
[graph] {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	[week] {
		display: flex;
		flex-direction: column;
		$GS: 0.6em;
		$SP: 0.3em;
		width: $GS;
		height: calc($GS * 7 + $SP * 6);
		margin-left: $SP;
		justify-content: space-between;
		[day] {
			width: $GS;
			height: $GS;
			background-color: var(--cb-green);
			border-radius: calc($GS / 8);
		}
	}
}
</style>