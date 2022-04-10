<template>
	<container>
		<v-form flex-column>
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
		</v-form>
	</container>
	<div btn-group>
		<btn type="solid green disabled">保存更改</btn>
		<btn type="solid red disabled">放弃更改</btn>
	</div>
</template>