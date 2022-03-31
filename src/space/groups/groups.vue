<template>
	<div groups>
		<Responsive
			group
			v-for="(group, i) in groups"
			:key="i"
			@click="details(group)"
		>
			<div icon>
				<i class="fas fa-award" v-if="group.system"></i>
				<i class="far fa-user" v-else></i>
			</div>
			<div group-id-name>
				<div group-id>{{ group.id }}</div>
				<div group-name>{{ group.name?.["zh-CN"] || group.id }}</div>
			</div>
			<div icon>
				<i class="fas fa-angle-right"></i>
			</div>
		</Responsive>
	</div>
	<div btn-group>
		<btn type="outlined blue" @click="create">添加用户组</btn>
	</div>
</template>

<script>
import createApi from '@CL/api'
import { defineComponent, onActivated, ref } from 'vue'
// Child window components
import { $ } from '@CC/WinStack.vue'
import Details from './details.vue'
// Group list api
const getGroupsList = createApi({ url: '/groups' })
export let PRIV_LIST = []
async function updateList() {
	this.$emit('loading', true);
	const groups = await getGroupsList()
		.then(res => res.json())
		.then(l => l.sort((a, b) => b.system - a.system))
	this.$emit('loading', false)
	PRIV_LIST = Object.keys(Object.fromEntries(
		groups
			.reduce((l, { privileges }) => [...l, ...privileges], [])
			.map(l => [l, 0])
	))
	this.groups = groups
}
export default defineComponent({
	data() {
		return { groups: [] }
	},
	methods: {
		create() {
			$('创建用户组', Details)
				.then(updateList.bind(this))
		},
		details(group) {
			$(`用户组 [${group.id}] 详情`, Details, {}, group)
				.then(updateList.bind(this))
		},
	},
	mounted() { updateList.apply(this) },
	onActivated() { updateList.apply(this) }
})
</script>


<style lang="scss" scoped>
[groups] {
	user-select: none;
	min-width: 50vw;
	[group] {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		padding: 0 1em;
		height: 3.6em;
		align-items: center;
		border-bottom: 1px solid var(--cb-gray-light);
		[icon] {
			font-size: 1.6em;
			color: var(--ct-gray);
			text-align: center;
			width: 1.2em;
			height: 1em;
			line-height: 100%;
			svg {
				width: 100%;
				opacity: 0;
				[gt-mark] {
					fill: var(--ct);
				}
			}
		}
		[group-id-name] {
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			height: 100%;
			padding: 0 1em;
			[group-id] {
				font-size: 0.8em;
				color: var(--ct-gray);
			}
			[group-name] {
				color: var(--ct-gray-dark);
				margin: 0.1em 0;
			}
		}
	}
}
</style>