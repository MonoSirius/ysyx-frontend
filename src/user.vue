<script setup>
import { router } from '@/router';
import createApi from '@CL/api';
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute(),
	user = ref({
		name: undefined,
		mail: undefined,
		groups: undefined
	}),
	userProfile = ref({
		institution: undefined,
	}),
	load = createApi(`/user/${route.params.userID}/`)
onMounted(async () => {
	const data = await load().then(async res => {
		if (res.ok) return res.json()
		else router.push(router.resolve(`/${
			res.status
		}?${
			await res.text()
		}`))
	});
	Object.assign(user.value, data)
})
</script>

<template>
	<container flex-column flex-start flex-grow content-h-fill content-left>
		<container style="padding-left: 0; padding-right: 0;">
			<h2>
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
		</container>
		<container round content-left margin-v next-level>
			<h3>基本信息</h3>
			<container margin-v flex-row align-start flex-wrap :pad="false">
				<container
					content-center
					margin-v
					margin-h
					flex-row
					flex-grow
					:pad="false"
				>
					<avatar
						:userID="route.params.userID"
						:size="8"
						style="margin: auto"
					/>
				</container>
				<container
					content-center
					flex-column
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
					</div>
					<div entry>
						<span title v-if="user.mail">邮箱</span>
						<span content>{{ user.mail }}</span>
					</div>
					<div entry>
						<span title v-if="user.groups">群组</span>
						<span content>
							<badge
								v-for="group in user.groups"
								:key="group.id"
								style="margin-left: 0"
							>
								<locale-name :name="group.name" />
							</badge>
						</span>
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
		flex-direction: column;
		align-items: flex-start;
		margin: 0 -2em 1em -2em;
		[title] {
			display: block;
			padding-bottom: 0.5em;
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
}
</style>