<script setup>
import { useRoute } from 'vue-router'
import User from './user.vue'
const route = useRoute()
</script>

<template>
	<user :key="route.params.userID" />
</template>