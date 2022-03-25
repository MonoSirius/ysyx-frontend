<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Avatar from '@CC/Avatar.vue'
import Container from '@CC/Container.vue'
import ReportGraph from './space/reportGraph.vue'
import btn from '@CC/Button.vue'
import vForm from '@CC/Form.vue'
import useUserStore from '@CS/user'
const user = useUserStore(),
	route = useRoute()
</script>

<template>
	<container flex-column flex-start flex-grow content-h-fill content-left>
		<container><h2>个人空间</h2></container>
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
						align-center
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
					<btn
						type="solid gray disabled"
						style="margin: 20px; max-width: 8em"
						>编辑</btn
					>
					<label></label>
					<label>创建新的学习记录</label>
					<btn
						type="solid gray"
						style="
							margin: 20px;
							max-width: 8em;
							font-size: 3em;
							font-weight: light !important;
							border: 2px dashed var(--cb-gray);
						"
						>+</btn
					>
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
	</container>
</template>

<style lang="scss" scoped>
h3 {
	display: block;
	padding-bottom: 10px;
	margin-bottom: 20px;
	border-bottom: 1px solid var(--cb-gray);
}
</style>