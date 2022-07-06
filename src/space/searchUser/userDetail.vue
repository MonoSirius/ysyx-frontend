<script setup>
import { ref, onMounted } from "vue"
import createApi from '@CL/api';
import { $, select } from '@CC/WinStack.vue'
import useUserStore from '@CS/user';
import User from '../../user.vue'
const props = defineProps({
		userID: String
	}),
	emit = defineEmits(['updated']),
	{ userID } = props,
	user = ref({
		name: '',
		email: '',
		groups: [],
		editable: {}
	}),
	errMsg = ref(''),
	loadUserInfo = async () => {
		const data = await createApi(`/user/${userID}/`)()
			.then(async res => {
				if (res.ok) return res.json()
				else errMsg.value = `${res.status}: ${await res.text()}`
			});
		Object.assign(user.value, data || {})
	},
	updated = () => {
		loadUserInfo()
		emit('updated')
	},
	showUserHome = () => $('用户详情', User, {}, { userID }).then(updated),
	loadGroups = createApi('/groups'),
	updateGroups = createApi(`/user/${userID}/groups`),
	editGroups = async () => {
		const currentGroups = user.value.groups?.map(({id}) => id) || []
		select(
			`设置 ${user.name || userID} 的用户组`,
			loadGroups()
				.then(res => res.json())
				.then(l => l.map(({ id, name }) => [
					id,
					name,
					currentGroups.includes(id)
				])),
			{
				async hook(arr) {
					updateGroups({
						add: arr.filter(id => !currentGroups.includes(id)),
						sub: currentGroups.filter(id => !arr.includes(id))
					}).then(updated)
				}
			}
		)
	}

onMounted(loadUserInfo)
</script>

<template>
	<container user-detail flex-row flex-wrap content-center>
		<div user-avatar><avatar :userID="props.userID" :size="2.5" /></div>
		<div user-info-actions>
			<div user-id-name-groups>
				<div user-id-name>
					<div user-name v-if="user.name">{{ user.name }}</div>
					<div user-id :class="user.name ? 'hasName' : ''">
						{{ props.userID }}
					</div>
				</div>
				<div user-groups-err-msg>
					<badge err-msg type="solid red" v-if="errMsg">
						<i class="fa fa-info-circle"></i>
						{{ errMsg }}
					</badge>
					<div user-groups v-if="user.groups.length">
						<template
							v-for="groupDsc in user.groups"
							:key="groupDsc.id"
						>
							<badge type="solid yellow"
								><locale-name
									:name="groupDsc.name || groupDsc.id"
							/></badge>
						</template>
					</div>
				</div>
			</div>
			<div actions>
				<btn
					type="solid gray-brand"
					v-if="user.editable.groups"
					@click="editGroups"
					><i class="fa fa-users"></i
				></btn>
				<btn type="solid gray-brand" @click="showUserHome"
					><i class="fa fa-arrow-right"></i
				></btn>
			</div>
		</div>
	</container>
</template>

<style lang="scss" scoped>
[user-detail] {
	&:not(:first-child) {
		border-top: 1px solid var(--cb-gray-light);
	}
	& > :not(:first-child) {
		margin-left: 1em;
	}
	[user-info-actions] {
		display: flex;
		flex-grow: 1;
		flex-wrap: nowrap;
		@media (max-width: 719px) {
			flex-direction: column;
			[actions] {
				justify-content: flex-start;
			}
		}
		@media (min-width: 720px) {
			flex-direction: row;
			[actions] {
				justify-content: flex-end;
			}
		}
	}
	[user-id-name-groups] {
		display: flex;
		flex-direction: column;
		* {
			display: flex;
			overflow: hidden;
			[user-id] {
				&.hasName {
					margin-left: 0.5em;
					color: var(--ct-gray);
				}
				&.hasName::before {
					content: "(";
					user-select: none;
				}
				&.hasName::after {
					content: ")";
					user-select: none;
				}
				font-family: "Cascadia Code", "Courier New", Courier, monospace;
			}
		}
		[user-groups-err-msg] {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			font-size: 0.8em;
			padding-top: 0.8em;
			[user-groups] {
				padding: 0;
				margin: 0;
				* {
					margin-left: 0;
				}
			}
		}
	}
	[actions] {
		padding: 0.2em 0;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		overflow: hidden;
		flex-grow: 1;
	}
}
</style>