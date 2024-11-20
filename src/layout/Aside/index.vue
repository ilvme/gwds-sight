<script setup>
import { NIcon, useMessage } from 'naive-ui'
import { RefreshOutlined } from '@vicons/material'
import { treeData } from '@/mock/table.js'

const data = ref(treeData)
const message = useMessage()
function refreshTree() {
  message.info('刷新树')
}

const showDropdown = ref(false)
const options = ref([
  { label: '创建数据源', key: '1' },
  { label: '创建数据库', key: '2' },
  { key: '11', type: 'divider' },
  { label: '创建表', key: '3' },
])
const xRef = ref(0)
const yRef = ref(0)

const handleSelect = (key) => {
  message.success(key)
  showDropdown.value = false
}
const handleClickOutside = () => {
  showDropdown.value = false
}
const nodeProps = ({ option }) => {
  return {
    onClick() {
      message.info(`[Click] ${option.label}`)
    },
    onContextmenu(e) {
      showDropdown.value = true
      xRef.value = e.clientX
      yRef.value = e.clientY

      e.preventDefault()
    },
  }
}
</script>

<template>
  <aside style="display: flex; flex-direction: column; height: calc(100vh - 50px)">
    <n-flex style="padding: 5px 10px" align="center" justify="space-between">
      <n-input size="small" placeholder="快速搜索" style="width: 200px" />
      <n-button circle quaternary @click="refreshTree">
        <n-icon size="20"><RefreshOutlined /></n-icon>
      </n-button>
    </n-flex>

    <n-scrollbar trigger="none" x-scrollable style="padding-right: 10px; padding-bottom: 10px">
      <n-tree block-line :data="data" :node-props="nodeProps" class="tree" />
      <n-dropdown
        size="small"
        trigger="manual"
        placement="bottom-start"
        :show="showDropdown"
        :options="options"
        :x="xRef"
        :y="yRef"
        @select="handleSelect"
        @clickoutside="handleClickOutside"
      />
    </n-scrollbar>
  </aside>
</template>

<style scoped>
.tree {
  flex: 1;
  width: 100%;

  overflow-x: auto;
}

:deep (.n-tree .n-tree-node-content) {
  padding: 0;
}
:deep(.n-tree .n-tree-node-wrapper) {
  padding: 1px 0;
}
:deep(.n-tree .n-tree-node-content .n-tree-node-content__prefix) {
  margin-right: 5px;
}
</style>
