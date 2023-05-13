<script setup>
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from "@ant-design/icons-vue";
let data = [
  {
    id: 1,
    title: "开发环境和基础工具",
    star: "10",
    like: "5",
    message: "5",
    tags: ["git", "linux", "VsCode"],
    description: "",
    owner: "",
    avatar: "",
    href: "",
    updateAt: "",
  },
  {
    id: 2,
    title: "基于vue+vite的工程实践",
    star: 6,
    like: 10,
    message: "6",
    tags: ["vue", "JavaScript", "vite"],
    description: "",
    owner: "",
    avatar: "",
    href: "",
    updateAt: "",
  },
];
let loading = false;
const loadingMore = false;

//
</script>

<template>
  <a-list
    size="large"
    rowKey="id"
    :loading="loading"
    itemLayout="vertical"
    :dataSource="data"
  >
    <template #renderItem="{ item }">
      <a-list-item key="item.id">
        <template #actions>
          <span>
            <StarOutlined style="margin-right: 8px" />
            {{ item.star }}
          </span>
          <span>
            <LikeOutlined style="margin-right: 8px" />
            {{ item.like }}
          </span>
          <span>
            <MessageOutlined style="margin-right: 8px" />
            {{ item.message }}
          </span>
        </template>
        <a-list-item-meta>
          <template #title>
            {{ item.title }}
          </template>
          <template #description>
            <span v-for="tag in item.tags">
              <a-tag>{{ tag }}</a-tag>
            </span>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
    <div
      slot="footer"
      v-if="data.length > 0"
      style="text-align: center; margin-top: 16px"
    >
      <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
    </div>
  </a-list>
</template>

<style scoped></style>
