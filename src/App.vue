<script setup>
import { RouterView } from 'vue-router'

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
        <RouterView />
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<style scoped></style>
