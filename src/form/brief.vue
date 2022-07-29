<script setup>
import { ref } from 'vue'
import formEntry from './briefEntry.vue'
import demoData from './demoData.js'
const
	list = ref(demoData)
</script>

<template>
	<v-form
		flex-column
		style="min-width: 240px; margin-right: 10px; flex-grow: 999"
	>
		<label>当前可提交的申请</label>
		<container flex-row flex-wrap :pad="false">
			<form-entry
				v-for="el in list.filter(
					({ eligible }) => eligible
				)"
				:key="el.id"
				:data="el"
				:ignoreSubmitted="true"
			/>
		</container>
		<label>提交历史</label>
		<container flex-row flex-wrap :pad="false">
			<form-entry
				v-for="el in list.filter(({ submitTime }) => submitTime)"
				:key="el.id"
				:data="el"
			/>
		</container>
	</v-form>
</template>