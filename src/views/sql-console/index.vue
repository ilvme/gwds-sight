<script setup>
import SQLEditor from '@/views/sql-console/SQLEditor.vue'
import { ref } from 'vue'
import { useTabStore } from '@/stores/tab.js'
import { storeToRefs } from 'pinia'

const tabStore = useTabStore()
const { tabList, activeTab } = storeToRefs(tabStore)

const initSourceNode = ref()
const { sourceNode } = tabList.value.find((item) => item.name === activeTab.value).props
initSourceNode.value = sourceNode
console.log(initSourceNode.value)
</script>

<template>
  <n-split
    direction="vertical"
    style="height: calc(100vh - 50px - 50px)"
    :max="0.8"
    :min="0.2"
    default-size="360px"
  >
    <template #1>
      <SQLEditor ref="sqlEditorRef" :sourceNode="initSourceNode" />
    </template>
    <template #2>
      <n-tabs default-value="1" style="padding-left: 10px">
        <n-tab-pane name="1" tab="执行信息"><p>> 执行 1 条 SQL, 耗时 34 毫秒。</p> </n-tab-pane>
        <n-tab-pane name="2" tab="t_user">
          <!--          <DataOperation origin="sql-console" />-->
          <n-empty description="没有任何数据" />
        </n-tab-pane>
      </n-tabs>
    </template>
  </n-split>
</template>

<style scoped></style>
