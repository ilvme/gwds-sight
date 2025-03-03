<script setup>
import { useBoolean } from '@/hooks/useBoolean.js'
import { ref, useTemplateRef } from 'vue'
import { Toast } from '@/utils/Layer.js'
import { createDatabase } from '@/api/database.js'
import { OP_TYPE_LIST, treeStore } from '@/layout/Aside/useTree.js'
import TreeUtil from '@/utils/menus/support.js'

defineOptions({ name: 'DatabaseCreator' })

const { bool: modalVisible, setTrue: showModal, setFalse: hiddenModal } = useBoolean(false)

const currentNode = ref(null)

const collationList = ref([])
const characterSetList = ref([])

const formRef = useTemplateRef('formRef')
const database = ref({
  databaseName: '', // 数据库名称
  collation: '',
  characterSet: '',
})

// 创建 & 保存数据源
const onSave = (e) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const res = await createDatabase({
        ...database.value,
        datasourceId: TreeUtil.parseDatasourceId(currentNode.value.key),
      })
      // 刷新树
      treeStore.refresh(
        OP_TYPE_LIST.ADD,
        res.data,
        TreeUtil.buildDatasourceKey(currentNode.value.key),
      )
      Toast.success('创建数据库成功')
      hiddenModal()
    }
  })
}

// 取消
const onCancel = () => {
  hiddenModal()
}

const rules = {
  databaseName: { required: true, message: '请输入数据库名称', trigger: 'blur' },
}

const openModal = async (node) => {
  currentNode.value = node
  showModal()
}

defineExpose({ openModal })
</script>

<template>
  <n-modal
    v-model:show="modalVisible"
    preset="card"
    title="创建数据库"
    style="width: 400px; height: 300px"
  >
    <n-form
      label-placement="left"
      label-width="80px"
      label-align="left"
      size="small"
      ref="formRef"
      :model="database"
      :rules="rules"
    >
      <n-form-item label="名称" path="name" required>
        <n-input v-model:value="database.databaseName" placeholder="请输入数据库名称" />
      </n-form-item>
      <n-form-item label="字符集" required>
        <n-select
          v-model:value="database.characterSet"
          :options="[
            { label: '从不', value: '1' },
            { label: '直到重启', value: '2' },
            { label: '直到会话', value: '3' },
            { label: '永久', value: '4' },
          ]"
        />
      </n-form-item>
      <n-form-item label="排序规则" required>
        <n-select
          v-model:value="database.collation"
          :options="[
            { label: '从不', value: '1' },
            { label: '直到重启', value: '2' },
            { label: '直到会话', value: '3' },
            { label: '永久', value: '4' },
          ]"
        />
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
