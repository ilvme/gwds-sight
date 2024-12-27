<script setup>
import Header from './Header/index.vue'
import Aside from './Aside/index.vue'
import Main from './Main/index.vue'
import { useMessage, useNotification } from 'naive-ui'

window.$message = useMessage()
window.$notification = useNotification()
</script>

<template>
  <Header />

  <main class="main">
    <n-split
      direction="horizontal"
      style="height: calc(100vh - 50px)"
      :max="0.6"
      min="280px"
      default-size="320px"
    >
      <template #1>
        <Aside />
      </template>
      <template #2>
        <Main />
      </template>

      <template #resize-trigger>
        <div style="height: 100%; background-color: #e3e1e1; width: 1px" />
      </template>
    </n-split>
  </main>
</template>

<style scoped></style>
