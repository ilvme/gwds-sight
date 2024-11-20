<script setup>
import SQLEditor from '@/components/SQLEditor/index.vue'
const data = ref([])
const columns = ref([
  { title: 'Name', key: 'name' },
  { title: 'Age', key: 'age' },
  { title: 'Address', key: 'address' },
])
</script>

<template>
  <n-split direction="vertical" style="height: calc(100vh - 50px - 50px)">
    <template #1>
      <SQLEditor />
    </template>
    <template #2>
      <n-tabs default-value="1">
        <n-tab-pane name="1" tab="执行信息"><p>> 执行 1 条 SQL, 耗时 34 毫秒。</p> </n-tab-pane>
        <n-tab-pane name="2" tab="t_user">
          <n-data-table size="small" :columns="columns" :data="data" :bordered="false" />
        </n-tab-pane>
      </n-tabs>
    </template>

    <template #resize-trigger>
      <div style="height: 1px; background-color: #e3e1e1; width: 100%" />
    </template>
  </n-split>
</template>

<style scoped></style>
