<script setup>
import { useBoolean } from '@/hooks/useBoolean.js'

defineOptions({ name: 'Preferences' })
const { bool: modalVisible, setTrue: showModal, setFalse: hiddenModal } = useBoolean(false)

const openModal = () => {
  showModal()
}

defineExpose({ openModal })
</script>

<template>
  <n-modal
    v-model:show="modalVisible"
    preset="card"
    title="设置"
    style="width: 800px; height: 600px; margin-top: 60px"
  >
    <n-tabs placement="left" type="line" size="small">
      <n-tab-pane tab="外观与行为" name="1">外观设置</n-tab-pane>
      <n-tab-pane tab="按键映射" name="2">按键映射设置</n-tab-pane>
      <n-tab-pane tab="数据库" name="5">数据库设置</n-tab-pane>
      <n-tab-pane tab="SQL 编辑器" name="3">SQL 编辑器设置</n-tab-pane>
      <n-tab-pane tab="高级设置" name="4">高级设置</n-tab-pane>
    </n-tabs>
    <template #action>
      <n-space justify="center">
        <n-button type="primary" @click="hiddenModal">确定</n-button>
        <n-button @click="hiddenModal">取消</n-button>
        <n-button @click="hiddenModal">应用</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped></style>
