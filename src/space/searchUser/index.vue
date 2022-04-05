<template>
	<container frame-content>
		<v-form>
			<label>User ID (逗号分隔)</label>
			<input type="text" autocomplete="off" v-model.trim="userID" />
			<label>用户名 (逗号分隔)</label>
			<input type="text" autocomplete="off" v-model.trim="names" />
			<label>用户组</label>
			<container
				next-level
				form-input
				round
				:responsive="true"
				@click="selectGroups"
			>
				<badge v-for="(gid, i) in groups" :key="i">
					<locale-name :name="groupNameLUT[gid]" />
				</badge>
				<div
					v-if="!groups.length"
					style="text-align: center; color: var(--ct-gray)"
				>
					选择用户组
				</div>
			</container>
			<label>所属机构</label>
			<container next-level form-input round :responsive="true">
				<div style="text-align: center; color: var(--ct-gray)">
					选择机构
				</div>
			</container>
		</v-form>
	</container>
	<div btn-group>
		<btn type="solid brand" @click="search">搜索</btn>
		<btn type="solid gray" @click="clear">清空搜索条件</btn>
	</div>
</template>

<script>
import createApi from '@CL/api'
import { defineComponent, onActivated, ref } from 'vue'
// Child window components
import { $, select } from '@CC/WinStack.vue'
// import Details from './details.vue'
// Group list api
const getGroupsList = createApi('/groups')
export let PRIV_LIST = []
export default defineComponent({
	setup() {
		return {
			userID: ref(''),
			groups: ref([]),
			names: ref([]),
			groupNameLUT: ref({})
		}
	},
	methods: {
		async selectGroups() {
			const result = await this
				.LOAD(getGroupsList().then(res => res.json()))
				// Update groups name
				.then(l => {
					l.forEach(({id, name}) => this.groupNameLUT[id] = name)
					return l
				})
				// Sort and format group list for selection
				.then(l => l
					.sort((a, b) => b.system - a.system)
					.map(({ id, name }) => [id, name, this.groups.includes(id)])
				)
				.then(l => select('选择用户组', l))
			if (result) this.groups = result
		},
 		search() {},
		clear() {}
	},
	mounted() {
	},
	// onActivated() { updateList.apply(this) }
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