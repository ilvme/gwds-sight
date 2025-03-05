<script setup>
import { useBoolean } from '@/hooks/useBoolean.js'
import { ref, useTemplateRef } from 'vue'
import { Toast } from '@/utils/Layer.js'
import TreeUtil from '@/utils/menus/support.js'
import { renameTable } from '@/api/table.js'
import { OP_TYPE_LIST, treeStore } from '@/layout/Aside/useTree.js'

defineOptions({ name: 'TableRename' })

const { bool: modalVisible, setTrue: showModal, setFalse: hiddenModal } = useBoolean(false)

const currentNode = ref(null)

const formRef = useTemplateRef('formRef')

const table = ref({
  oldTableName: undefined,
  newTableName: undefined,
})

// 保存
const onSave = (e) => {
  e.preventDefault()
  // 新旧表名重复性判断
  if (table.value.oldTableName === table.value.newTableName) {
    Toast.error('新旧表名重复')
    return
  }

  formRef.value?.validate(async (errors) => {
    if (!errors) {
      await renameTable({
        datasourceId: TreeUtil.parseDatasourceId(currentNode.value.key),
        databaseName: TreeUtil.parseDatabaseName(currentNode.value.key),

        oldTableName: table.value.oldTableName,
        tableName: table.value.newTableName,
      })

      // 刷新树
      const newNode = {
        ...currentNode.value,
        label: table.value.newTableName,
        key: currentNode.value.key.replace(table.value.oldTableName, table.value.newTableName),
      }

      treeStore.refresh(
        OP_TYPE_LIST.RENAME,
        newNode,
        currentNode.value.parent.key,
        currentNode.value,
      )
      Toast.success('重命名表成功')
      hiddenModal()
    }
  })
}

// 取消
const onCancel = () => {
  hiddenModal()
}

const rules = {
  newTableName: { required: true, message: '请输入表名称', trigger: 'blur' },
}

const openModal = async (node) => {
  currentNode.value = node
  table.value.oldTableName = currentNode.value.label
  table.value.newTableName = currentNode.value.label
  showModal()
}

defineExpose({ openModal })
</script>

<template>
  <n-modal
    v-model:show="modalVisible"
    preset="card"
    title="重命名表"
    style="width: 400px; height: 280px"
  >
    <n-form
      label-placement="left"
      label-width="80px"
      label-align="left"
      size="small"
      ref="formRef"
      :model="table"
      :rules="rules"
    >
      <n-form-item label="原表名" path="oldTableName" required>
        <n-input v-model:value="table.oldTableName" disabled />
      </n-form-item>
      <n-form-item label="新表名" path="newTableName" required>
        <n-input v-model:value="table.newTableName" placeholder="请输入新表名称" />
      </n-form-item>
    </n-form>

    <template #action>
      <n-space justify="center">
        <n-button @click="onCancel" size="small">取消</n-button>
        <n-button type="primary" @click="onSave" size="small">确定</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped></style>
