<template>
	<container
		flex-column
		style="min-width: 60vw; min-height: 50vh"
		:pad="false"
	>
		<userDetail
			v-for="userID in searchResult"
			:key="userID"
			:userID="userID"
			@updated="() => updateSearchResult()"
		/>
		<h1
			v-if="!searchResult.length"
			style="
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: var(--ct-gray-light);
				font-weight: normal;
			"
		>
			<locale-name
				:name="{
					zh: '没有匹配的结果',
					en: 'No matching result',
				}"
			/>
		</h1>
	</container>
</template>

<script>
import createApi from '@CL/api'
import { defineComponent, markRaw, ref } from 'vue'
import userDetail from './userDetail.vue'
// Child window components
// Group list api
const getSearchResult = createApi('/search-user')
export default defineComponent({
	components: { userDetail },
	setup(searchArgs = {}) {
		return { searchArgs: markRaw(searchArgs), searchResult: ref([]) }
	},
	methods: {
		async updateSearchResult() {
			await this
				.LOAD(getSearchResult(this.searchArgs).then(res => res.json()))
				.then(result => this.searchResult = result)
		}
	},
	activated() {
		this.updateSearchResult()
	}
})
</script>