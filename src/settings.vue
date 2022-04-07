<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { $, confirm, prompt, select } from '@CC/WinStack.vue'
import EditAvatar from './settings/edit-avatar.vue';
import useUserStore from '@CS/user'
import guard from '@CL/guard'
guard()
const user = useUserStore()
// WindowStack call
async function removeAvatar() {
	if (await confirm('确认移除您的头像?'))
		prompt('删除成功', '您的头像已经移除')
}
function updateAvatar() {
	$('编辑头像', EditAvatar, {}, user.userID)
}
</script>

<template>
	<container flex-column flex-start flex-grow content-h-fill content-left>
		<container><h2>账号设置</h2></container>
		<container round content-left margin-v next-level>
			<h3>基本信息</h3>
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
					style="margin-bottom: 10px; flex-grow: 1"
					:pad="false"
				>
					<h4>头像</h4>
					<container
						next-level
						round
						margin-v
						flex-column
						content-center
					>
						<avatar
							:style="{ margin: 'auto', 'margin-bottom': '20px' }"
							:userID="user.userID"
							:size="8"
						/>
						<btn
							type="solid brand"
							style="margin: 10px"
							@click="updateAvatar"
							>更改头像</btn
						>
						<btn
							type="solid red"
							style="margin: 10px"
							@click="removeAvatar"
							>移除头像</btn
						>
					</container>
				</container>
				<v-form
					flex-column
					style="min-width: 240px; margin-right: 10px; flex-grow: 999"
				>
					<label>姓名</label>
					<input style="max-width: 300px" type="text" />
					<label>邮箱</label>
					<input style="max-width: 300px" type="text" />
					<label>所属机构</label>
					<input style="max-width: 300px" type="text" />
					<label>密码</label>
					<input style="max-width: 300px" type="text" />
					<btn
						type="solid green disabled"
						style="margin: 10px; max-width: 8em"
						>保存更改</btn
					>
				</v-form>
			</container>
		</container>
		<container round content-left margin-v next-level>
			<h3>偏好设置</h3>
			<v-form
				flex-column
				style="min-width: 240px; margin-right: 10px; flex-grow: 999"
			>
				<label>语言</label>
				<select style="max-width: 300px" disabled>
					<option value="all">中文 - 简体</option>
				</select>
				<label>推送通知</label>
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