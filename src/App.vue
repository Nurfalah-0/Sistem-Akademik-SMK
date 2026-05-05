<template>
  <div v-if="!route.meta.layout || route.meta.layout !== 'auth'">
    <AppLayout />
  </div>
  <div v-else>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import AppLayout from './components/layout/AppLayout.vue'

const route = useRoute()
const authStore = useAuthStore()

onMounted(() => {
  authStore.initAuth()
})
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  @apply antialiased;
}
</style>
