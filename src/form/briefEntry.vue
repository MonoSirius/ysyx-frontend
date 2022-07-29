<script setup>
const
	props = defineProps({
		data: Object,
		ignoreSubmitted: {
			type: Boolean,
			default: false
		}
	}),
	{
		id,
		title = 'No title',
		description = 'No description',
		submitTime,
		decisionTime,
		decision,
	} = props.data,
	submitDate = submitTime && new Date(submitTime)
</script>

<template>
	<container form-brief-entry :pad="false">
		<div entry-title>{{ title }}</div>
		<div entry-info>{{ description }}</div>
		<div entry-status v-if="!props.ignoreSubmitted">
			<div v-if="submitTime">
				<b><locale-name :name="{ zh: '提交于' }" /></b>
				&nbsp;<pre>{{
					submitDate.toLocaleDateString()
				}} {{
					[
						submitDate.getHours(),
						submitDate.getMinutes().toString().padStart(2, '0')
					]
						.map(x => x.toString().padStart(2, '0'))
						.join(':')
				}}</pre>
			</div>
		</div>
	</container>
</template>

<style lang="scss" scoped>
[form-brief-entry] {
	background-color: var(--cf);
	margin: 1em 2em 2em 0;
	max-width: 16em;
	box-shadow: 2px 2px 8px 0 #0006;
	border-radius: 5px;
	& > * {
		padding: 8px 12px;
	}
	[entry-title] {
		background-color: var(--cf-next-level);
		font-weight: bold;
	}
	& > :not([entry-title]) {
		font-size: 0.9em;
		color: var(--ct-gray);
	}
	[entry-info] {
		line-height: 160%;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	[entry-status] {
		border-top: 1px solid var(--cb-gray-light);
	}
}
</style>