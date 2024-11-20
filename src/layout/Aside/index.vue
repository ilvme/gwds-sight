<script setup>
import { ref } from 'vue'
import { NIcon, useMessage } from 'naive-ui'
import { RefreshOutlined } from '@vicons/material'
import { treeData, treeRightClickMappings } from '@/utils/table.js'

const data = ref(treeData)
const message = useMessage()
function refreshTree() {
  message.info('刷新树')
}
const currentClickNode = ref(null)

const showDropdown = ref(false)

// 根据右键的 key 不同需返回不同的菜单
const rightOptions = ref([])
const xRef = ref(0)
const yRef = ref(0)

const handleSelect = (key) => {
  message.success(key)
  console.log(currentClickNode.value)
  showDropdown.value = false
}
const handleClickOutside = () => {
  showDropdown.value = false
}
const nodeProps = ({ option }) => {
  return {
    onClick() {
      currentClickNode.value = option
      message.info(`[Click] ${option.label}`)
    },
    onContextmenu(e) {
      currentClickNode.value = option
      if (option.key.startsWith('1-')) {
        rightOptions.value = treeRightClickMappings.DATASOURCE
      } else {
        rightOptions.value = [
          { label: '查看', key: 'COMMON_SHOW' },
          { key: '11', type: 'divider' },
          { label: '刷新', key: 'COMMON_REFRESH' },
        ]
      }
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
        :options="rightOptions"
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
