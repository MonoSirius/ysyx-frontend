<template>
	<container frame-content>
		<container type="alert" v-if="errMsg">{{ errMsg }}</container>
		<v-form>
			<label for="groupID">用户组 ID</label>
			<input
				type="text"
				name="groupID"
				autocomplete="off"
				v-model.trim="id"
				:disabled="mode == UPDATE"
				@keydown.enter="$refs.userName.focus()"
			/>
			<label>用于显示的名称</label>
			<container
				form-input
				next-level
				flex-column
				:pad="false"
				:responsive="true"
				@click="editLocale"
			>
				<div
					v-for="(localeName, locale) in name"
					:key="locale"
					style="margin: 0.2em 0"
				>
					<badge>{{ locale }}</badge>
					<span style="font-size: 0.9em">{{ localeName }}</span>
				</div>
				<div placeholder v-if="Object.keys(name).length == 0">
					设置名称
				</div>
			</container>
			<label for="privileges">权限</label>
			<container
				form-input
				next-level
				flex-row
				flex-wrap
				:pad="false"
				:responsive="true"
				@click="selectPrivileges"
			>
				<badge
					v-for="(priv, i) in privileges"
					:key="i"
					style="margin: 0.5em"
					>{{ priv }}</badge
				>
				<div placeholder v-if="!privileges?.length">设置权限</div>
			</container>
			<label for="visibility">可见范围</label>
			<select v-model="visibility">
				<option value="ALL">对所有人可见</option>
				<option value="SAME-GROUP">对同属于该组的用户可见</option>
				<option value="SELF">仅对用户本人可见</option>
				<option value="NONE">对任何人不可见 (隐藏)</option>
			</select>
		</v-form>
	</container>
	<div btn-group>
		<btn type="solid green" @click="submit">应用更改</btn>
		<btn type="solid red" v-if="mode == UPDATE && !system" @click="remove"
			>删除用户组</btn
		>
		<btn type="solid gray" @click="RETURN()">取消</btn>
	</div>
</template>

<script>
import { confirm, select, editLocale, alert } from '@CC/WinStack.vue'
import createApi from '@CL/api'
import { defineComponent, ref } from 'vue'
import { PRIV_LIST } from './index.vue'
const api = [
		createApi('/groups/create'),
		createApi('/groups/update'),
		createApi('/groups/remove'),
	],
	[CREATE, UPDATE, REMOVE] = Object.keys(api)
export default defineComponent({
	setup({ id = '', name = {}, privileges = [], system = false, visibility = "SELF" } = {}) {
		const mode = id ? UPDATE : CREATE
		id = ref(id)
		name = ref(name)
		privileges = ref(privileges)
		visibility = ref(visibility)
		return { id, name, privileges, visibility, mode, system }
	},
	data() {
		return { errMsg: '', UPDATE, CREATE }
	},
	methods: {
		submit() {
			const { id, name, privileges, visibility, mode } = this
			this.$emit('loading', true)
			api[mode]({id, localeName: name, privileges, visibility})
				.then(async res => {
					this.$emit('loading', false)
					if (res.ok) this.RETURN()
					else this.errMsg = await res.text()
				})
		},
		async editLocale() {
			const result = await editLocale(
					`设置用户组名称: ${this.id}`,
					this.name
				)
			if (result) this.name = result
		},
		async selectPrivileges() {
			const result = await select(
					`设置用户组权限: ${this.id}`,
					PRIV_LIST.map(p => [p, p, ~this.privileges.indexOf(p)]),
					false
				)
			if (Array.isArray(result)) this.privileges = result
		},
		async remove() {
			if (await confirm(
				`删除用户组'${this.id}'?`,
				'删除用户组会同时解除所有用户与此用户组的关联, 这可能导致用户失去一部分权限',
				{ color: 'red', text: '删除' }
			)) {
				this.$emit('loading', true)
				api[REMOVE]({ id: this.id }).then(async res => {
					this.$emit('loading', false)
					if (res.ok) {
						await alert('删除成功', `用户组 ${this.id} 已删除`)
						this.RETURN()
					} else {
						await alert('操作失败', await res.text())
						this.errMsg = await res.text()
					}
				})
			}
		}
	}
})
</script>

<style lang="scss" scoped>
[frame-content] {
	min-width: 60vw;
	[placeholder] {
		text-align: center;
		width: 100%;
		color: var(--ct-gray-light);
		font-weight: bold;
		margin: 0;
		padding: 1em;
	}
}
</style>