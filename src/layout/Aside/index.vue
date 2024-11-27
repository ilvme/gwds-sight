<script setup>
import { ref, useTemplateRef } from 'vue'
import { RefreshOutlined } from '@vicons/material'
import { treeData, treeRightClickMappings } from '@/utils/table.js'
import TableCreatorAndEditor from '@/views/table/create.vue'
import DatasourceCreator from '@/views/datasource/create.vue'
import { Toast } from '@/utils/Layer.js'

const data = ref(treeData)

const filterText = ref('')
function refreshTree() {
  Toast.info('刷新树')
}
const currentClickNode = ref(null)

const showDropdown = ref(false)

// 根据右键的 key 不同需返回不同的菜单
const rightOptions = ref([])
const xRef = ref(0)
const yRef = ref(0)

const tableCreatorAndEditorRef = useTemplateRef('tableCreatorAndEditorRef')
const datasourceCreatorRef = useTemplateRef('datasourceCreatorRef')
const handleSelect = (key) => {
  console.log(currentClickNode.value)
  switch (key) {
    case 'TABLE_CREATE':
      tableCreatorAndEditorRef.value.openModal()
      break
    case 'DATASOURCE_CREATE':
      datasourceCreatorRef.value.openModal()
      break
    default:
      Toast.success(key)
  }
  showDropdown.value = false
}
const handleClickOutside = () => {
  showDropdown.value = false
}
const nodeProps = ({ option }) => {
  return {
    onClick() {
      currentClickNode.value = option
      Toast.info(`[Click] ${option.label}`)
    },
    onContextmenu(e) {
      currentClickNode.value = option
      if (option.key.startsWith('1-')) {
        rightOptions.value = treeRightClickMappings.DATASOURCE
      } else {
        rightOptions.value = [
          { label: '创建表', key: 'TABLE_CREATE' },
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
      <n-input
        size="small"
        v-model:value="filterText"
        placeholder="快速搜索"
        style="width: 200px"
      />
      <n-button circle quaternary @click="refreshTree">
        <n-icon size="20"><RefreshOutlined /></n-icon>
      </n-button>
    </n-flex>

    <n-tree
      virtual-scroll
      block-line
      :data="data"
      :pattern="filterText"
      :show-irrelevant-nodes="false"
      :node-props="nodeProps"
      style="height: calc(100vh - 50px)"
      class="tree"
    />
    <!-- 右键菜单 -->
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

    <!-- 创建表 -->
    <TableCreatorAndEditor ref="tableCreatorAndEditorRef" />

    <!-- 创建数据源 -->
    <DatasourceCreator ref="datasourceCreatorRef" />
  </aside>
</template>

<style scoped>
.tree {
  //flex: 1;
  width: 100%;
  max-width: 100%;

  overflow-x: auto;
}

:deep(.n-tree .n-tree-node-content) {
  padding: 0;
}
:deep(.n-tree .n-tree-node-wrapper) {
  padding: 1px 0;
}
:deep(.n-tree .n-tree-node-content .n-tree-node-content__prefix) {
  margin-right: 5px;
}

:deep(.n-tree .n-tree-node.n-tree-node--highlight .n-tree-node-content .n-tree-node-content__text) {
  //font-weight: bold;
  background-color: #ffffd2;
}

:deep(
    .n-tree .n-tree-node:not(.n-tree-node--disabled).n-tree-node--clickable .n-tree-node-content
  ) {
  white-space: nowrap;
}
</style>
