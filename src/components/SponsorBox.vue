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
	document.addEventListener('scroll', () => {
		if (window.innerWidth >= 720) return
		let el = box.value,
			elTop = el?.offsetTop || 0,
			elHeight = el.offsetHeight,
			mid =
				document.scrollingElement.scrollTop + (window.innerHeight >> 1)
		if (mid > elTop && mid < elTop + elHeight) {
			el.focus()
		}
	})
})
</script>

<template>
	<div
		:style="{ '--scale': scale }"
		tabindex="-1"
		:ref="(_) => (box = _)"
		@touchdown="box.focus"
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

<style scoped>
div {
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	padding: 1em;
	overflow: visible;
	filter: saturate(0) contrast(50%);
}

div:hover,
div:focus {
	filter: none;
	background-color: var(--cf-next-level);
}

@media (min-width: 720px) {
	div {
		width: 360px;
		height: 120px;
	}
}

@media (max-width: 719px) {
	div {
		width: 100%;
		height: 24vw;
	}
}
</style>