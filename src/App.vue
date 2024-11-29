<script setup>
import Layout from '@/layout/index.vue'

// TODO 优化
const themeOverrides = {
  common: {
    primaryColor: '#2080f0',
    primaryColorHover: '#2080f0',
    primaryColorPressed: '#2080f0',
    primaryColorSuppl: '#2080f0',
  },
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-notification-provider>
      <n-message-provider>
        <Layout />
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<style scoped></style>
