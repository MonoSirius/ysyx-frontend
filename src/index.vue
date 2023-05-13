<script setup>
import WinStack from "@CC/WinStack.vue";
import useUserStore from "@CS/user";
import NavLink from "@CC/header/NavLink.vue";
import UserBadge from "@CC/header/UserBadge.vue";
import ColorSchemeSwitch from "@CC/header/ColorSchemeSwitch.vue";
import { router } from "../router";
// Loading animation params
import { ref } from "vue";
const loading = ref(false);
const user = useUserStore();
user.update();
setInterval(() => {
  if (user.loginState) user.update();
}, 60_000);
// Router loading animation
router.beforeEach((to, from, next) => {
  loading.value = true;
  next();
});
router.beforeResolve((to, from, next) => {
  loading.value = false;
  next();
});
</script>

<template>
  <v-header :loading="loading">
    <template #title>
      <img alt="YSYX logo" class="logo" src="@CR/logo/line.png" />
      <div style="flex-grow: 1"></div>
      <ColorSchemeSwitch style="margin-right: 8px" />
    </template>
    <template #nav>
      <nav-link to="/" title="主页"><i class="fa fa-home"></i>主页</nav-link>
      <nav-link to="/post" title="公告列表"
        ><i class="fa fa-bullhorn"></i>公告
      </nav-link>
      <nav-link to="/docs/" title="文档"><i class="fa fa-book"></i> 文档</nav-link>
      <nav-link to="/forum" title="讨论区"><i class="fa fa-comments"></i> 讨论区</nav-link>
      <nav-link
        to="/redirect/to/docs.qq.com/sheet/DT29weHpIRWNnYlFl?tab=BB08J2"
        title="学习记录"
        ><i class="fa fa-link"></i>学习记录
      </nav-link>
      <nav-link v-if="!user.loginState" to="/register" title="注册"
        >注册
      </nav-link>
      <nav-link v-if="!user.loginState" to="/login" title="登录"
        >登录
      </nav-link>
      <nav-link v-if="user.loginState" to="/space" title="个人空间"
        >个人空间
      </nav-link>
      <user-badge v-if="user.loginState" />
    </template>
  </v-header>
  <WinStack />
  <v-body>
    <router-view></router-view>
  </v-body>
</template>

<style scoped>
/* Header elements layout */
.logo {
  height: 1.2em;
}

html.dark .logo {
  filter: contrast(0) brightness(160%);
}
</style>