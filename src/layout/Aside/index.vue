<script setup>
import { onMounted, ref, useTemplateRef } from 'vue'
import { treeRightClickMappings } from '@/utils/menus/treeRightClickMappings.js'
import TableCreatorAndEditor from '@/views/table/create.vue'
import DatasourceCreator from '@/views/datasource/create.vue'
import { Toast } from '@/utils/Layer.js'
import { fetchTree } from '@/api/tree.js'

// const data = ref(treeData)
const data = ref([])

onMounted(async () => {
  const res = await fetchTree()
  data.value = res.data
  console.log(res.data)
})

// 当前点击的树节点
const currentClickNode = ref(null)

const showDropdown = ref(false)

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

// 根据右键的 key 不同需返回不同的菜单
const rightOptions = ref([])
const xRef = ref(0)
const yRef = ref(0)
const nodeProps = ({ option }) => {
  return {
    isLeaf: option.isLeaf || option.children === null,
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

function clickOutside() {
  showDropdown.value = false
}

const handleLoad = async (node) => {
  console.log('load', node.key)
  const { data } = await fetchTree(1, node)
  console.log(data)
  node.children = data
}
</script>

<template>
  <aside style="height: calc(100vh - 50px)">
    <n-tree
      class="tree"
      @load="handleLoad"
      check-strategy="child"
      :data="data"
      :node-props="nodeProps"
    />
    <!-- 树右键菜单 -->
    <n-dropdown
      size="small"
      trigger="manual"
      placement="bottom-start"
      :show="showDropdown"
      :options="rightOptions"
      :x="xRef"
      :y="yRef"
      @select="handleSelect"
      @clickoutside="clickOutside"
    />

    <!-- 创建表 -->
    <TableCreatorAndEditor ref="tableCreatorAndEditorRef" />

    <!-- 创建数据源 -->
    <DatasourceCreator ref="datasourceCreatorRef" />
  </aside>
</template>

<style scoped>
.tree {
  width: 100%;
  max-width: 100%;
  height: 100%;
  padding: 2px 10px;
  overflow: auto;
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

:deep(
    .n-tree .n-tree-node:not(.n-tree-node--disabled).n-tree-node--clickable .n-tree-node-content
  ) {
  white-space: nowrap;
}
</style>
