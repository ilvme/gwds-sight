<script setup>
import { useBoolean } from '@/hooks/useBoolean.js'
import { computed, ref } from 'vue'
import { deleteDatasource } from '@/api/datasource.js'
import { Toast } from '@/utils/Layer.js'
import { OP_TYPE_LIST, treeStore } from '@/layout/Aside/useTree.js'

defineOptions({ name: 'DatasourceRemover' })

const { bool: modalVisible, setTrue: showModal, setFalse: hiddenModal } = useBoolean(false)

const node = ref(null)
const id = ref('')
const name = ref('')

const content = computed(() => {
  return `数据源 ${name.value} 将被删除。`
})

const openModal = (datasourceNode) => {
  node.value = datasourceNode
  id.value = datasourceNode.key.split('-')[1]
  name.value = datasourceNode.label
  showModal()
}

const onConfirm = async () => {
  hiddenModal()
  await deleteDatasource(id.value)
  treeStore.refresh(OP_TYPE_LIST.REMOVE, node)
  Toast.success('删除数据源成功')
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
