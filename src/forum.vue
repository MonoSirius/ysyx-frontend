<script setup>
import Discussion from "./forum/discussion.vue";
import { DownOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
// data
const sortBy = ref("");
const selectLabel = ref("Vue");
// method
function search() {}
function onClickSortBy(event) {
  switch (event.key) {
    case "1":
      sortBy.value = "Latest Activity";
      break;
    case "2":
      sortBy.value = "Date Posted";
      break;
    case "3":
      sortBy.value = "Top: PastMonth";
      break;
    default:
      sortBy.value = "Latest Activity";
      break;
  }
}
function onClickLabel(event) {
  switch (event.key) {
    case "1":
      selectLabel.value = "Vue";
      break;
    case "2":
      selectLabel.value = "Git";
      break;
    case "3":
      selectLabel.value = "JavaScript";
      break;
    default:
      selectLabel.value = "Vue";
      break;
  }
}
</script>

<template>
  <container w1280 flex-column flex-start flex-grow content-h-fill content-left>
    <container style="padding-left: 0; padding-right: 0">
      <h2>讨论区</h2>
    </container>
    <container round content-left margin-v next-level>
      <a-row 
      type="flex" 
      :gutter="24" 
      justify="space-between" 
      align="middle">
        <a-col flex="auto">
          <a-input-search
            v-model:value="value"
            placeholder="input search text"
            @search="onSearch"
        /></a-col>
        <a-col flex="200px"
          ><a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              Sort By: {{ sortBy }}
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu @click="onClickSortBy">
                <a-menu-item key="1">Latest Activity</a-menu-item>
                <a-menu-item key="2">Date Posted</a-menu-item>
                <a-menu-item key="3">Top: PastMonth</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown></a-col
        >
        <a-col flex="200px">
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              Label:
              <a-tag >{{ selectLabel }}</a-tag>
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu @click="onClickLabel">
                <a-menu-item key="1">Vue</a-menu-item>
                <a-menu-item key="2">Git</a-menu-item>
                <a-menu-item key="3">Vite</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-col>
      </a-row>
    </container>
    <container round content-left margin-v next-level>
      <Discussion />
    </container>
  </container>
</template>

<style lang="scss" scoped>
.ant-dropdown-link {
  text-align: center;
  width: 100%;
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
