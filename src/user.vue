<script setup>
import { router } from '@/router';
import { $, select } from '@CC/WinStack.vue';
import createApi from '@CL/api';
import useUserStore from '@CS/user';
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Settings from './settings/settings.vue'
import EditAvatar from './settings/edit-avatar.vue'
const route = useRoute(),
	localUser = useUserStore(),
	userID = route.params.userID,
	user = ref({
		name: undefined,
		mail: undefined,
		groups: undefined
	}),
	userProfile = ref({
		institution: undefined,
	}),
	load = createApi(`/user/${userID}/`)
onMounted(async () => {
	const data = await load().then(async res => {
		if (res.ok) return res.json()
		else router.push(router.resolve(`/${
			res.status
		}?${
			await res.text()
		}`))
	}) || {};
	Object.assign(user.value, data)
})
const settings = () => $('偏好设置', Settings)
const editAvatar = () => $('编辑头像', EditAvatar, {}, user.userID)
const
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
					}).then(() => location.href = location.href)
				}
			}
		)
	}
</script>

<template>
	<container
		flex-column
		flex-start
		flex-grow
		content-h-fill
		content-left
		w1280
	>
		<container
			flex-space-between
			style="padding-left: 0; padding-right: 0; display: flex"
		>
			<h2 style="display: block">
				{{ user.name || route.params.userID }}
				<span
					style="
						font-weight: normal;
						margin-left: 0.3em;
						color: var(--ct-gray);
					"
				>
					的主页
				</span>
			</h2>
			<div>
				<btn
					type="solid gray"
					v-if="localUser.userID == userID"
					@click="settings"
					style="margin: 0"
				>
					<i class="fa fa-cog"></i>&nbsp;偏好设置
				</btn>
			</div>
		</container>
		<container round content-left margin-v next-level>
			<h3>基本信息</h3>
			<container margin-v flex-row flex-center flex-wrap :pad="false">
				<container
					content-center
					margin-v
					margin-h
					flex-column
					flex-grow
					:pad="false"
				>
					<avatar
						:userID="route.params.userID"
						:size="8"
						style="margin: auto"
					/>
					<btn
						type="solid gray-brand"
						v-if="user?.editable?.avatar"
						@click="editAvatar"
						style="margin-top: 1em"
					>
						<i class="fa fa-edit"></i>&nbsp; 编辑头像
					</btn>
				</container>
				<container
					flex-column
					flex-center
					margin-h
					style="flex-grow: 999"
				>
					<div entry>
						<span title>ID</span>
						<span content>{{ route.params.userID }}</span>
					</div>
					<div entry>
						<span title v-if="user.name">姓名</span>
						<span content>{{ user.name }}</span>
						<container edit v-if="user?.editable?.name">
							<btn type="solid gray-brand">
								<i class="fa fa-edit"></i>&nbsp; 修改姓名
							</btn>
						</container>
					</div>
					<div entry>
						<span title>邮箱</span>
						<span content v-if="user.mail">{{ user.mail }}</span>
						<span content v-else
							><badge style="margin: 0"
								>用户邮箱设置为不可见</badge
							></span
						>
						<container edit v-if="user?.editable?.mail">
							<btn type="solid gray-brand">
								<i class="fa fa-edit"></i>&nbsp; 更改邮箱
							</btn>
						</container>
					</div>
					<div entry>
						<span title v-if="user.groups">群组</span>
						<span content v-if="user.groups?.length">
							<badge
								v-for="group in user.groups"
								:key="group.id"
								style="margin-left: 0"
							>
								<locale-name :name="group.name" />
							</badge>
						</span>
						<span content v-else
							><badge style="margin: 0">无可见群组</badge></span
						>
						<container
							edit
							v-if="user?.editable?.mail"
							@click="editGroups"
						>
							<btn type="solid gray-brand">
								<i class="fa fa-edit"></i>&nbsp; 设置群组
							</btn>
						</container>
					</div>
				</container>
			</container>
		</container>
		<container round content-left margin-v next-level>
			<h3>学习进度</h3>
			<container margin-v flex-row align-start flex-wrap :pad="false">
				<container
					content-center
					margin-v
					margin-h
					flex-row
					flex-grow
					:pad="false"
				>
					<h2
						style="
							color: var(--ct-gray-light);
							display: block;
							width: 100%;
							padding: 2em;
							text-align: center;
						"
					>
						暂无学习进度记录, 或被用户设置为不可见
					</h2>
				</container>
			</container>
		</container>
		<container round content-left margin-v next-level>
			<h3>申请表</h3>
			<container margin-v flex-row align-start flex-wrap :pad="false">
				<container
					content-center
					margin-v
					margin-h
					flex-row
					flex-grow
					:pad="false"
				>
					<h2
						style="
							color: var(--ct-gray-light);
							display: block;
							width: 100%;
							padding: 2em;
							text-align: center;
						"
					>
						暂无待处理的申请表
					</h2>
				</container>
			</container>
		</container>
	</container>
</template>

<style lang="scss" scoped>
h3 {
	display: block;
	padding-bottom: 10px;
	margin-bottom: 20px;
	border-bottom: 1px solid var(--cb-gray);
}
[entry] {
	display: flex;
	align-items: center;
	margin-bottom: 1em;
	overflow: hidden;
	text-overflow: ellipsis;
	@media (max-width: 719px) {
		position: relative;
		flex-direction: column;
		align-items: stretch;
		margin: 0 -2em 1em -2em;
		[title] {
			display: block;
			padding-bottom: 0.5em;
		}
		[edit] {
			position: absolute;
			top: 0;
			right: 0;
			font-size: 0.8em;
		}
	}
	[title] {
		display: inline-block;
		font-weight: bold;
		color: var(--ct-gray);
		margin-right: 0.5em;
		min-width: 3em;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	[content] {
		font-weight: bold;
		color: var(--ct-gray-dark);
		overflow: hidden;
		text-overflow: ellipsis;
	}
	[edit] {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex-grow: 1;
		padding: 0;
		margin: 0;
		& > div {
			margin: 0;
			padding: 0.3em 0.8em;
		}
	}
}
</style>