<script setup>
import { onMounted, ref, watch } from 'vue'
const props = defineProps({
	alt: String,
	scale: {
		type: Number,
		default: 1,
	},
	el: Object,
})
const box = ref(null)
onMounted(() => {
	document.addEventListener('scroll', activeBox)
})
function activeBox() {
	if (window.innerWidth >= 720) return
	let el = box.value,
		elTop = el?.offsetTop || 0,
		elHeight = el?.offsetHeight || 0,
		mid = document?.scrollingElement?.scrollTop + (window.innerHeight / 2)
	if (mid > elTop && mid < elTop + elHeight) {
		el.focus()
	}
}
</script>

<template>
	<div
		sponsor-box
		:style="{ '--scale': scale }"
		tabindex="-1"
		:ref="(_) => (box = _)"
	>
		<component
			:is="el"
			class="sponsor"
			style="
				max-width: 90%;
				max-height: 90%;
				transform: scale(var(--scale));
				width: 100%;
			"
		/>
	</div>
</template>

<style>
html.dark svg .clx {
	fill: var(--c-brand-contrast) !important;
}
</style>

<style lang="scss" scoped>
[sponsor-box] {
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	padding: 1em;
	overflow: visible;
	&:hover,
	&:focus {
		background-color: var(--cf-next-level);
	}

	@media (min-width: 720px) {
		& {
			width: 360px;
			height: 120px;
		}
	}

	@media (max-width: 719px) {
		& {
			width: 100%;
			max-width: 360px;
			height: 24vw;
			max-height: 120px;
		}
	}
}
</style>