<script setup>
import NavLink from "@CC/header/NavLink.vue";
const data = [
  {
    title: "关于第六期“一生一芯”训练营开课通知",
    date: "2023-2-1",
    description: "一生一芯",
  },
  {
    title: "一生一芯工程实践中期检查通知",
    date: "2023-1-14",
    description: "一生一芯与中国科学技术大学软件学院工程实践项目",
  },
  {
    title: "中国科学技术大学工程实践项目介绍",
    date: "2022-12-25",
    description: "一生一芯",
  },
  {
    title: "通知4",
    date: "2022-12-17",
    description: "一生一芯",
  },
];
</script>

<template>
  <container w1280 flex-column flex-start flex-grow content-h-fill content-left>
    <container style="padding-left: 0; padding-right: 0">
      <h2>通知公告</h2>
    </container>
    <container round content-left margin-v next-level>
      <a-list item-layout="horizontal" :pagination="true" :data-source="data">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta>
              <template #description>
                {{ item.description }}
              </template>
              <template #title>
                <a-row>
                  <a-col :span="8">
                    <nav-link to="/post/detail" title="通知详情"
                      ><i class="fa fa-bell"></i>{{ item.title }}</nav-link
                    >
                  </a-col>
                  <a-col :span="8" :offset="8">{{ item.date }}</a-col>
                </a-row>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </container>
  </container>
  <router-view></router-view>
</template>

<style scoped></style>
