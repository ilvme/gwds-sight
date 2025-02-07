<script setup>
import { useBoolean } from '@/hooks/useBoolean.js'
import { ref, useTemplateRef } from 'vue'
import { Toast } from '@/utils/Layer.js'
import { createDatasource, fetchDatasource } from '@/api/datasource.js'
import { treeStore } from '@/layout/Aside/useTree.js'

defineOptions({ name: 'DatasourceCreator' })

const { bool: modalVisible, setTrue: showModal, setFalse: hiddenModal } = useBoolean(false)

const id = ref(null)

// 密码保存方式
const pwdSaveType = ref('4')
const formRef = useTemplateRef('formRef')
const datasource = ref({
  name: 'ss', // 名称
  description: 'asdasda', // 注释
  host: '1.1.1.1', // 主机
  port: 3306, // 端口
  username: 'asadasd', // 用户名
  password: 'asdasda', // 密码
  database: 'ssssss', //  默认数据库
  url: 'asda', // url
})

// 测试连接
const onTestConnection = () => {
  Toast.info('测试连接成功')
}

// 创建 & 保存数据源
const onSave = (e) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      await createDatasource(datasource.value)
      Toast.success('创建数据源成功')
      treeStore.refresh()
      hiddenModal()
    }
  })
}

// 取消
const onCancel = () => {
  hiddenModal()
}

const rules = {
  name: { required: true, message: '请输入数据源名称', trigger: 'blur' },
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
  host: { required: true, message: '请输入主机', trigger: ['blur'] },
  port: {
    required: true,
    message: '请输入端口',
    validator: (rule, value) => {
      if (!value) {
        return new Error('请输入端口')
      } else if (!/^\d*$/.test(value)) {
        return new Error('端口应该为整数')
      } else {
        if (value > 65535 || value < 1) {
          return new Error('端口范围在1-65535之间')
        }
        return true
      }
    },
    trigger: ['blur'],
  },
}

const openModal = async (datasourceId) => {
  if (datasourceId) {
    id.value = datasourceId
    const { data } = await fetchDatasource(datasourceId)
    datasource.value = data
    console.log(datasource.value)
  }
  showModal()
}

defineExpose({ openModal })
</script>

<template>
  <n-modal
    v-model:show="modalVisible"
    preset="card"
    title="设置"
    style="width: 660px; height: 600px"
  >
    <n-form
      label-placement="left"
      label-width="66px"
      label-align="left"
      size="small"
      ref="formRef"
      :model="datasource"
      :rules="rules"
    >
      <n-form-item label="名称" path="name">
        <n-input v-model:value="datasource.name" />
      </n-form-item>
      <n-form-item label="注释" path="description">
        <n-input v-model:value="datasource.description" />
      </n-form-item>
      <n-tabs type="segment" placement="top" size="small">
        <n-tab-pane tab="常规" name="1">
          <n-flex justify="space-between">
            <n-form-item label="主机" path="host">
              <n-input v-model:value="datasource.host" style="width: 300px" />
            </n-form-item>
            <n-form-item label="端口" path="port">
              <n-input-number
                :show-button="false"
                v-model:value="datasource.port"
                :max="65535"
                :min="1"
                style="width: 120px"
                :value="5258"
              />
            </n-form-item>
          </n-flex>

          <n-form-item label="用户名" path="username">
            <n-input v-model:value="datasource.username" style="width: 300px" />
          </n-form-item>
          <n-flex justify="space-between">
            <n-form-item label="密码" path="password">
              <n-input v-model:value="datasource.password" style="width: 300px" type="password" />
            </n-form-item>
            <n-form-item label="保存">
              <n-select
                v-model:value="pwdSaveType"
                :options="[
                  { label: '从不', value: '1' },
                  { label: '直到重启', value: '2' },
                  { label: '直到会话', value: '3' },
                  { label: '永久', value: '4' },
                ]"
                style="width: 120px"
              />
            </n-form-item>
          </n-flex>
          <n-form-item label="数据库"><n-input style="width: 300px" /> </n-form-item>
          <n-form-item label="URL"><n-input /> </n-form-item>
        </n-tab-pane>
        <n-tab-pane tab="选项" name="2">选项配置</n-tab-pane>
        <n-tab-pane tab="SSH/SSL" name="3">SSH/SSL 配置</n-tab-pane>
        <n-tab-pane tab="高级" name="4">高级配置</n-tab-pane>
      </n-tabs>
    </n-form>

    <template #action>
      <n-space justify="center">
        <n-button type="primary" @click="onSave">确定</n-button>
        <n-button @click="onCancel">取消</n-button>
        <n-button type="success" @click="onTestConnection">测试连接</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped></style>
