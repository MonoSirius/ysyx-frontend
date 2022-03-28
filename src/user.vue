<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Avatar from '@CC/Avatar.vue'
import Container from '@CC/Container.vue'
import btn from '@CC/Button.vue'
const route = useRoute()
</script>

<template>
	<container flex-column flex-start flex-grow content-h-fill content-left>
		<container
			><h2>
				<span style="font-weight: bold; color: var(--ct-gray)">{{
					route.params.userID
				}}</span
				>的主页
			</h2></container
		>
		<container round content-left margin-v next-level>
			<h3>基本信息</h3>
			<container
				margin-v
				flex-row-reverse
				align-start
				flex-wrap
				:pad="false"
			>
				<h4>头像</h4>
				<container next-level round margin-v flex-column align-center>
					<avatar
						:style="{ margin: 'auto', 'margin-bottom': '20px' }"
						:userID="route.params.userID"
						:size="8"
					/>
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
</style>