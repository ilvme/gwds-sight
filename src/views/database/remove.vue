<script setup>
import { useBoolean } from '@/hooks/useBoolean.js'
import { computed, ref } from 'vue'
import { Toast } from '@/utils/Layer.js'
import { OP_TYPE_LIST, treeStore } from '@/layout/Aside/useTree.js'
import { deleteDatabase } from '@/api/database.js'
import TreeUtil from '@/utils/menus/support.js'

defineOptions({ name: 'DatabaseRemover' })

const { bool: modalVisible, setTrue: showModal, setFalse: hiddenModal } = useBoolean(false)

const node = ref(null)
const name = ref('')

const content = computed(() => {
  return `数据库 ${name.value} 将被删除。`
})

const openModal = (databaseNode) => {
  node.value = databaseNode
  name.value = databaseNode.label
  showModal()
}

const onConfirm = async () => {
  hiddenModal()
  console.log('nnnn', node.value)
  await deleteDatabase(TreeUtil.parseDatasourceId(node.value.key), name.value)

  treeStore.refresh(OP_TYPE_LIST.REMOVE, node)
  Toast.success('删除数据库成功')
}

defineExpose({ openModal })
</script>

<template>
  <n-modal
    v-model:show="modalVisible"
    preset="dialog"
    title="确认"
    type="warning"
    :content="content"
    positive-text="确定"
    negative-text="取消"
    @positive-click="onConfirm"
    @negative-click="hiddenModal"
  />
</template>

<style scoped></style>
