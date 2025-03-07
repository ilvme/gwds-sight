<script setup>
import Layout from '@/layout/index.vue'
import { darkTheme, dateZhCN, useOsTheme, zhCN } from 'naive-ui'
import { computed } from 'vue'

const osTheme = useOsTheme()
const theme = computed(() => (osTheme.value === 'dark' ? darkTheme : undefined))
</script>

<template>
  <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-global-style />

    <n-notification-provider>
      <n-message-provider>
        <Layout />
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<style scoped></style>
