<template>
	<container flex-column style="min-width: 80vw;" :pad="false">
		<userDetail
			v-for="userID in searchResult"
			:key="userID"
			:userID="userID"
			@updated="() => updateSearchResult()"
		/>
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