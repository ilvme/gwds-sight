<script setup>
import { AutoAwesomeOutlined } from '@vicons/material'

defineOptions({ name: 'Welcome' })
</script>

<template>
  <main style="height: calc(100vh - 50px)" class="flex justify-center items-center">
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
