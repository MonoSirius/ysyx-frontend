<template>
	<container frame-content style="min-width: 40vw">
		<v-form>
			<label>User ID (逗号分隔)</label>
			<container
				flex-row
				style="margin: 1em 0"
				:pad="false"
				v-if="userIdList"
			>
				<template v-for="(userID, i) in userIdList" :key="i">
					<badge type="solid blue">{{ userID }}</badge>
				</template>
			</container>
			<input
				type="text"
				autocomplete="off"
				v-model.trim="userID"
				@keydown.enter="search"
			/>
			<label>姓名 (逗号分隔)</label>
			<container
				flex-row
				style="margin: 1em 0"
				:pad="false"
				v-if="userNameList"
			>
				<template v-for="(name, i) in userNameList" :key="i">
					<badge type="solid green">{{ name }}</badge>
				</template>
			</container>
			<input
				type="text"
				autocomplete="off"
				v-model.trim="userName"
				@keydown.enter="search"
			/>
			<label>用户组</label>
			<container
				next-level
				form-input
				round
				:responsive="true"
				@click="selectGroups"
			>
				<badge type="solid yellow" v-for="(gid, i) in groups" :key="i">
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
import { defineComponent, ref } from 'vue'
// Child window components
import { $, select } from '@CC/WinStack.vue'
import Search from './search.vue'
const search = (searchArgs) => $('搜索用户', Search, {}, searchArgs)
// Group list api
const getGroupsList = createApi('/groups')
function parseCommaSplittedList(str) {
	const result = str.split(',').map(el => el.trim()).filter(el => !!el)
	return result.length ? result : undefined
}
export default defineComponent({
	setup() {
		return {
			userID: ref(''),
			groups: ref([]),
			userName: ref(''),
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
 		search() {
			search({
				userID: this.userIdList,
				name: this.userNameList,
				groups: this.groupsList,
			})
		},
		clear() {}
	},
	computed: {
		userIdList() {
			return parseCommaSplittedList(this.userID)
		},
		userNameList() {
			return parseCommaSplittedList(this.userName)
		},
		groupsList() {
			return (Array.isArray(this.groups) && this.groups.length)
				? [...this.groups]
				: undefined
		}
	}
})
</script>