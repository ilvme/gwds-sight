<script setup>
import { useBoolean } from '@/hooks/useBoolean.js'
import { computed, ref } from 'vue'
import { deleteDatasource } from '@/api/datasource.js'
import { Toast } from '@/utils/Layer.js'
import { treeStore } from '@/layout/Aside/useTree.js'

defineOptions({ name: 'DatasourceRemover' })

const { bool: modalVisible, setTrue: showModal, setFalse: hiddenModal } = useBoolean(false)

const id = ref('')
const name = ref('')

const content = computed(() => {
  return `数据源 ${name.value} 将被删除。`
})

const openModal = (datasource) => {
  console.log(datasource)
  id.value = datasource.id
  name.value = datasource.name
  showModal()
}

const onConfirm = async () => {
  hiddenModal()
  await deleteDatasource(id.value)
  treeStore.refresh()
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
