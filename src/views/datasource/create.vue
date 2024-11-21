<script setup>
import { useBoolean } from '@/hooks/useBoolean.js'
import { ref } from 'vue'

defineOptions({ name: 'DatasourceCreator' })

const { bool: modalVisible, setTrue: showModal, setFalse: hiddenModal } = useBoolean(false)

const openModal = () => {
  showModal()
}

// 密码保存方式
const pwdSaveType = ref('4')

defineExpose({ openModal })
</script>

<template>
  <n-modal
    v-model:show="modalVisible"
    preset="card"
    title="设置"
    style="width: 800px; height: 600px"
  >
    <n-form label-placement="left" label-width="60px" label-align="left" size="small">
      <n-form-item label="名称"><n-input /></n-form-item>
      <n-form-item label="注释"><n-input /></n-form-item>
      <n-tabs type="segment" placement="top" size="small">
        <n-tab-pane tab="常规" name="1">
          <n-flex justify="space-between">
            <n-form-item label="主机"><n-input style="width: 360px" /> </n-form-item>
            <n-form-item label="端口"><n-input /> </n-form-item>
          </n-flex>

          <n-form-item label="用户名"><n-input /> </n-form-item>
          <n-flex justify="space-between">
            <n-form-item label="密码">
              <n-input style="width: 360px" type="password" />
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
                style="width: 200px"
              />
            </n-form-item>
          </n-flex>
          <n-form-item label="数据库"><n-input /> </n-form-item>
          <n-form-item label="URL"><n-input /> </n-form-item>
        </n-tab-pane>
        <n-tab-pane tab="选项" name="2">选项配置</n-tab-pane>
        <n-tab-pane tab="SSH/SSL" name="3">SSH/SSL 配置</n-tab-pane>
        <n-tab-pane tab="高级" name="4">高级配置</n-tab-pane>
      </n-tabs>
    </n-form>

    <template #action>
      <n-space justify="end" size="small">
        <n-button size="small" type="primary" @click="hiddenModal">确定</n-button>
        <n-button size="small" @click="hiddenModal">取消</n-button>
        <n-button size="small" type="info" @click="hiddenModal">测试连接</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped></style>
