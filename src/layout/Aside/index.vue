<script setup>
import { onMounted, ref, useTemplateRef } from 'vue'
import { getMenuByNodeType } from '@/utils/menus/tree.js'
import TableCreatorAndEditor from '@/views/table/create.vue'
import DatasourceCreator from '@/views/datasource/create.vue'
import { Toast } from '@/utils/Layer.js'
import { fetchTree } from '@/api/tree.js'
import { getTreeIconByNodeType, renderIcon } from '@/utils/icon.js'
import { ViewListRound } from '@vicons/material'
import { useTabStore } from '@/stores/tab.js'
import { nanoid } from 'nanoid'

// const data = ref(treeData)
const data = ref([])

onMounted(async () => {
  const res = await fetchTree()
  res.data.forEach((item) => {
    item.prefix = renderIcon(ViewListRound, { size: 18 })
  })
  data.value = res.data
})

// 当前点击的树节点
const currentClickNode = ref(null)

const showDropdown = ref(false)

const { addTab } = useTabStore()

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
    case 'SQL_CONSOLE':
      addTab({
        label: 'SQL 编辑器[mysql@localhost]',
        name: nanoid(),
        props: {
          type: 'SQL_CONSOLE',
          sourceNode: currentClickNode.value,
        },
      })
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
    // isLeaf: option.isLeaf || option.children === null,
    onClick() {
      currentClickNode.value = option
      Toast.info(`[Click] ${option.label}`)
    },
    onContextmenu(e) {
      currentClickNode.value = option
      rightOptions.value = getMenuByNodeType(option)
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

// 懒加载
const handleLoad = async (node) => {
  console.log('load', node.key)
  const { data } = await fetchTree(1, node)
  data.forEach((item) => {
    item.prefix = renderIcon(getTreeIconByNodeType(item))
  })
  node.children = data
}
</script>

<template>
  <aside style="height: calc(100vh - 50px)">
    <n-tree
      class="tree"
      @load="handleLoad"
      check-strategy="child"
      block-line
      :data="data"
      :node-props="nodeProps"
    >
      <template #empty>
        <n-empty description="请先新建一个数据源吧" />
      </template>
    </n-tree>
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
  overflow: auto;
}
:deep(.n-tree-node-indent) {
  width: 18px;
}
:deep(.n-tree .n-tree-node-content) {
  padding: 2px;
}
:deep(.n-tree .n-tree-node-wrapper) {
  padding: 1px 0;
}
:deep(.n-tree .n-tree-node-content .n-tree-node-content__prefix) {
  margin-right: 5px;
}

/*:deep(
    .n-tree .n-tree-node:not(.n-tree-node--disabled).n-tree-node--clickable .n-tree-node-content
  ) {
  white-space: nowrap;
}*/
</style>
