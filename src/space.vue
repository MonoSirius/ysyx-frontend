<script setup>
import { useRoute } from 'vue-router'
import useUserStore from '@CS/user'
import guard from '@CL/guard'
import { router } from '@/router'
// Window components
import { $, ProgressReport as PR } from '@CC/WinStack.vue'
import Groups from './space/groups/index.vue'
import SearchUser from './space/searchUser/index.vue'
import ReportGraph from './space/reportGraph.vue'
import ApplicationForm from './form/brief.vue'
// Window component callback declaration 
const groups = () => $('用户组管理', Groups)
const notice = () => $('公告管理', Groups)
const searchUser = () => $('搜索用户', SearchUser)
const searchPR = () => $('搜索学习报告', Groups)
const searchForm = () => $('搜索申请表', Groups)
// Guard this path for logged in visitors only
guard()
const user = useUserStore(),
	route = useRoute(),
	alert = (...args) => window.alert(...args),
	{ protocol, host } = location,
	oscc = [protocol, host.replace(/^ysyx\./i, '')].join('//')
</script>

<template>
	<container w1280 flex-column flex-start flex-grow content-h-fill content-left>
		<container style="padding-left: 0; padding-right: 0">
			<h2>个人空间</h2>
		</container>
		<container round content-left margin-v next-level>
			<h3>学习记录</h3>
			<container
				margin-v
				flex-row-reverse
				align-start
				flex-wrap
				:pad="false"
			>
				<container
					content-block
					flex-column
					style="margin-bottom: 10px; flex-grow: 1; max-width: 100%"
					:pad="false"
				>
					<h4>提交热点图</h4>
					<container
						next-level
						round
						margin-v
						flex-column
						content-center
						style="
							max-width: 100%;
							overflow: hidden;
							overflow-x: scroll;
							padding: 10px;
						"
					>
						<ReportGraph />
					</container>
					<btn type="solid brand" style="margin: 10px; max-width: 8em"
						>查看详情</btn
					>
				</container>
				<v-form
					flex-column
					style="min-width: 240px; margin-right: 10px; flex-grow: 999"
				>
					<label>最新提交的记录</label>
					<input
						type="button"
						style="max-width: 8em"
						value="编辑"
						disabled
					/>
					<label>创建新的学习记录</label>
					<container
						form-input
						next-level
						flex-row
						flex-center
						content-center
						style="
							border-radius: 1em;
							border: 2px dashed var(--cf-next-next-level);
						"
						@click="PR.submit"
						:responsive="true"
					>
						<span
							style="
								color: var(--ct-gray-light);
								font-size: 5rem;
								font-weight: lighter;
								line-height: 150%;
							"
							>+</span
						>
					</container>
				</v-form>
			</container>
		</container>
		<container round content-left margin-v next-level>
			<h3>我的申请</h3>
			<v-form
				flex-column
				style="min-width: 240px; margin-right: 10px; flex-grow: 999"
			>
				<label>当前可提交的申请</label>
				<select style="max-width: 300px" disabled>
					<option value="all">中文 - 简体</option>
					>
				</select>
				<label>提交历史</label>
				<select style="max-width: 300px">
					<option value="all">接收所有通知</option>
					<option value="related">仅接收与我相关的通知</option>
					<option value="none">不接收自动发送的通知</option>
				</select>
				<btn
					type="solid green disabled"
					style="margin: 10px; max-width: 8em"
					>保存更改</btn
				>
			</v-form>
		</container>
		<container round content-left margin-v next-level>
			<h3>学生管理</h3>
			<container flex-row flex-wrap app-container :pad="false">
				<container
					round
					next-level
					@click="searchUser"
					:responsive="true"
				>
					<h4>搜索用户</h4>
					<p>根据用户组、ID、姓名、机构搜索用户</p>
				</container>
				<container
					round
					next-level
					@click="searchPR"
					:responsive="true"
				>
					<h4>查阅学习报告</h4>
					<p>查阅用户提交的学习报告</p>
				</container>
				<container
					round
					next-level
					@click="searchForm"
					:responsive="true"
				>
					<h4>审核申请表</h4>
					<p>审阅用户提交的申请表</p>
				</container>
			</container>
		</container>
		<container round content-left margin-v next-level>
			<h3>系统设置</h3>
			<container flex-row flex-wrap app-container :pad="false">
				<container round next-level @click="groups" :responsive="true">
					<h4>用户组管理</h4>
					<p>添加、移除、修改系统内用户组的名称、权限和可见范围</p>
				</container>
				<container round next-level :responsive="true">
					<h4>公告管理</h4>
					<p>
						添加、移除、修改系统公告,
						所有改动将会实时反应在主站的公告栏
					</p>
				</container>
			</container>
		</container>
		<span
			style="
				width: 100%;
				padding: 1em 0;
				color: var(--ct-gray-light);
				text-align: center;
				line-height: 200%;
				user-select: none;
			"
			@click.meta.shift="(e) => alert('hello')"
		>
			<b
				><locale-name
					:name="{
						zh: '一生一芯团队',
						en: 'YSYX Project Team',
					}" /></b
			><br />
			<a
				:href="oscc"
				style="
					font-size: 0.8em;
					text-decoration: none;
					color: inherit;
					font-weight: bold;
					display: inline-block;
					padding: 0 0.5em;
					border: 1px solid var(--cb-gray-light);
					border-radius: 5px;
				"
				>OSCC</a
			>
			-
			<locale-name
				:name="{
					zh: '开源芯片社区',
					en: 'Open Source Chip Platform',
				}"
			/>
		</span>
	</container>
</template>

<style lang="scss" scoped>
h3 {
	display: block;
	padding-bottom: 10px;
	margin-bottom: 20px;
	border-bottom: 1px solid var(--cb-gray);
}
[app-container] {
	margin: -1rem;
	align-items: stretch;
	& > * {
		border: 1px solid var(--cb-gray-light);
		max-width: 320px;
		margin: 1rem;
	}
	p {
		font-size: 0.9em;
		color: var(--ct-gray);
		padding-top: 0.3em;
	}
}
</style>