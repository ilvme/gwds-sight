<script setup>
import { AutoAwesomeOutlined } from '@vicons/material'
defineOptions({ name: 'Welcome' })
</script>

<template>
  <main
    style="display: flex; justify-content: center; align-items: center; height: calc(100vh - 50px)"
  >
    <n-empty description="欢迎使用 GWDS～">
      <template #icon>
        <n-icon>
          <AutoAwesomeOutlined />
        </n-icon>
      </template>
    </n-empty>
  </main>
</template>

<style scoped></style>
