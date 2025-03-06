<script setup>
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'
import { getMenuByNodeType } from '@/utils/menus/tree.js'
import TableCreatorAndEditor from '@/views/table/create.vue'
import DatasourceCreator from '@/views/datasource/create.vue'
import { Toast } from '@/utils/Layer.js'
import { fetchTree } from '@/api/tree.js'
import { getTreeIconByNodeType, renderIcon } from '@/utils/icon.js'
import { ViewListRound } from '@vicons/material'
import { useTabStore } from '@/stores/tab.js'
import { nanoid } from 'nanoid'
import DatasourceRemover from '@/views/datasource/remove.vue'
import { OP_TYPE_LIST, treeStore } from '@/layout/Aside/useTree.js'
import DatabaseCreator from '@/views/database/create.vue'
import DatabaseRemover from '@/views/database/remove.vue'
import TableRename from '@/views/table/rename.vue'

// const data = ref(treeData)
// 当移除或增加节点时恢复原展开节点状态
const defaultExpandKeys = ref(['ds-1', 'db-dev_env-1', 'tf-dev_env-1'])
const handleUpdateExpandKeys = (keys) => {
  defaultExpandKeys.value = keys
}
const data = ref([])
const loading = ref(false)

// 监听 treeStore.flag 变化，当有值时添加或删除节点
watch(
  () => treeStore.flag,
  async () => {
    // 添加节点
    const { targetNode, opType, parentKey, oldNode } = treeStore
    switch (opType) {
      case OP_TYPE_LIST.ADD: // 添加节点
        targetNode.prefix = renderIcon(getTreeIconByNodeType(targetNode.nodeType))
        addNodeToTree(data.value, parentKey, targetNode)
        treeStore.init()
        break
      case OP_TYPE_LIST.REMOVE: // 删除节点
        removeNodeFromTree(data.value, targetNode.key)
        treeStore.init()
        break
      case OP_TYPE_LIST.RENAME: // 重命名节点
        removeNodeFromTree(data.value, oldNode.key)

        targetNode.prefix = renderIcon(getTreeIconByNodeType(targetNode.nodeType))
        addNodeToTree(data.value, parentKey, targetNode)
        treeStore.init()
        break
      default:
        treeStore.init()
    }
  },
)

onMounted(async () => {
  await initTree()
})

async function initTree() {
  loading.value = true
  const res = await fetchTree()
  res.data.forEach((item) => {
    item.prefix = renderIcon(ViewListRound, { size: 18 })
  })
  loading.value = false
  data.value = res.data
}

// 添加树节点
function addNodeToTree(treeData, parentKey, newNode) {
  if (!parentKey) {
    return treeData.push(newNode)
  }
  const findParent = (nodes) => {
    for (const node of nodes) {
      if (node.key === parentKey) {
        if (!node.children) node.children = []
        node.children.push(newNode)
        return true
      }
      if (node.children && findParent(node.children)) {
        return true
      }
    }
    return false
  }
  findParent(treeData)
}

// 删除树节点
function removeNodeFromTree(treeData, targetKey) {
  const remove = (nodes) => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].key === targetKey) {
        nodes.splice(i, 1)
        return true
      }
      if (nodes[i].children && remove(nodes[i].children)) {
        return true
      }
    }
    return false
  }
  remove(treeData)
}

// 当前点击的树节点
const currentClickNode = ref(null)

const showDropdown = ref(false)

const { addTab } = useTabStore()

const tableCreatorAndEditorRef = useTemplateRef('tableCreatorAndEditorRef')
const tableRenameRef = useTemplateRef('tableRenameRef')

const databaseCreatorRef = useTemplateRef('databaseCreatorRef')
const databaseRemoverRef = useTemplateRef('databaseRemoverRef')
const datasourceCreatorRef = useTemplateRef('datasourceCreatorRef')
const datasourceRemoverRef = useTemplateRef('datasourceRemoverRef')
const handleSelect = (key) => {
  console.log('click node：', currentClickNode.value)
  switch (key) {
    // 数据库创建
    case 'DATABASE_CREATE':
      databaseCreatorRef.value.openModal(currentClickNode.value)
      break
    case 'DATABASE_DELETE':
      databaseRemoverRef.value.openModal(currentClickNode.value)
      break

    // 表创建
    case 'TABLE_CREATE':
      tableCreatorAndEditorRef.value.openModal(currentClickNode.value)
      break
    // 表重命名
    case 'TABLE_RENAME':
      tableRenameRef.value.openModal(currentClickNode.value)
      break

    // 数据源创建
    case 'DATASOURCE_CREATE':
      datasourceCreatorRef.value.openModal()
      break
    case 'DATASOURCE_EDIT':
      datasourceCreatorRef.value.openModal(currentClickNode.value.key.split('-')[1])
      break
    case 'DATASOURCE_REMOVE':
      // datasourceRemoverRef.value.openModal({
      //   id: currentClickNode.value.key.split('-')[1],
      //   name: currentClickNode.value.label,
      // })
      datasourceRemoverRef.value.openModal(currentClickNode.value)
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
    case 'TABLE_OPEN':
      addTab({
        label: `表[${currentClickNode.value.label}]`,
        name: nanoid(),
        props: {
          type: 'DATA_OPERATION',
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
      e.preventDefault()
      showDropdown.value = false
      nextTick().then(() => {
        currentClickNode.value = option
        rightOptions.value = getMenuByNodeType(option)
        showDropdown.value = true
        xRef.value = e.clientX
        yRef.value = e.clientY
      })
    },
  }
}

function clickOutside() {
  showDropdown.value = false
}

// 懒加载
const handleLoad = async (node) => {
  // 将 node.key 按照 - 切割
  const arr = node.key.split('-')
  const { data } = await fetchTree(arr[arr.length - 1], node)
  data.forEach((item) => {
    item.prefix = renderIcon(getTreeIconByNodeType(item.nodeType))
  })
  node.children = data
}
</script>

<template>
  <aside style="height: calc(100vh - 60px)">
    <n-scrollbar style="max-height: 100%; padding: 2px 0 10px 0" x-scrollable>
      <n-spin size="small" :show="loading" :delay="500">
        <template #description> 拼命加载中... </template>
        <n-tree
          v-if="loading === false"
          class="tree"
          @load="handleLoad"
          check-strategy="child"
          show-line
          :data="data"
          :node-props="nodeProps"
          :default-expanded-keys="defaultExpandKeys"
          @update-expanded-keys="handleUpdateExpandKeys"
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

        <!-- 表重命名 -->
        <TableRename ref="tableRenameRef" />

        <!-- 创建数据源 -->
        <DatasourceCreator ref="datasourceCreatorRef" />

        <!-- 移除数据源 -->
        <DatasourceRemover ref="datasourceRemoverRef" />

        <!-- 创建数据库 -->
        <DatabaseCreator ref="databaseCreatorRef" />

        <!-- 删除数据库 -->
        <DatabaseRemover ref="databaseRemoverRef" />
      </n-spin>
    </n-scrollbar>
  </aside>
</template>

<style scoped>
.tree {
  width: 100%;
  max-width: 100%;
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

:deep(
    .n-tree .n-tree-node:not(.n-tree-node--disabled).n-tree-node--clickable .n-tree-node-content
  ) {
  white-space: nowrap;
}
</style>
