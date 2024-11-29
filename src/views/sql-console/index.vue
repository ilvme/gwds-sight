<script setup>
import SQLEditor from '@/views/sql-console/components/SQLEditor.vue'
import { ref, useId } from 'vue'
import DataOperation from '@/views/data/index.vue'
</script>

<template>
  <n-split direction="vertical" style="height: calc(100vh - 50px - 50px)">
    <template #1>
      <SQLEditor :key="useId()" />
    </template>
    <template #2>
      <n-tabs default-value="1" style="padding-left: 10px">
        <n-tab-pane name="1" tab="执行信息"><p>> 执行 1 条 SQL, 耗时 34 毫秒。</p> </n-tab-pane>
        <n-tab-pane name="2" tab="t_user">
          <DataOperation />
        </n-tab-pane>
      </n-tabs>
    </template>

    <template #resize-trigger>
      <div style="height: 1px; background-color: #e3e1e1; width: 100%" />
    </template>
  </n-split>
</template>

<style scoped></style>
