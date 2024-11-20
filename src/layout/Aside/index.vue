<script setup>
import { ref, h } from 'vue'
import { NIcon, useMessage } from 'naive-ui'
import { DatabaseFilled, FolderFilled, SafetyCertificateFilled } from '@vicons/antd'
import { RefreshOutlined } from '@vicons/material'

const data = ref([
  {
    key: '1',
    label: 'mysql@1.2.3.09',
    prefix: () =>
      h(NIcon, null, {
        default: () => h(DatabaseFilled),
      }),
    children: [
      {
        key: '1-1',
        label: '系统数据库',
        prefix: () =>
          h(NIcon, null, {
            default: () => h(FolderFilled),
          }),
        children: [
          {
            key: '1-1-1',
            label: 'information_schema',
            prefix: () =>
              h(NIcon, null, {
                default: () => h(DatabaseFilled),
              }),
          },
          {
            key: '1-1-2',
            label: 'performance_schema',
            prefix: () =>
              h(NIcon, null, {
                default: () => h(DatabaseFilled),
              }),
          },
        ],
      },
      {
        key: '1-2',
        label: '用户数据库',
        prefix: () =>
          h(NIcon, null, {
            default: () => h(FolderFilled),
          }),
      },
      {
        key: '1-3',
        label: '用户与权限',
        prefix: () =>
          h(NIcon, null, {
            default: () => h(SafetyCertificateFilled),
          }),
      },
      { key: '1-4', label: '会话信息' },
      { key: '1-5', label: '系统信息' },
    ],
  },
  {
    key: '2',
    label: 'gbase@localhost',
    children: [
      { key: '2-1', label: '系统数据库' },
      { key: '2-2', label: '用户数据库' },
      { key: '2-3', label: '用户与权限' },
      { key: '2-4', label: '会话信息' },
      { key: '2-5', label: '系统信息' },
    ],
  },
])
const message = useMessage()
function refreshTree() {
  message.info('刷新树')
}

const showDropdown = ref(false)
const options = ref([
  { label: '创建数据源', key: '1' },
  { label: '创建数据库', key: '2' },
  { key: '11', type: 'divider' },
  { label: '创建表', key: '3' },
])
const xRef = ref(0)
const yRef = ref(0)

const handleSelect = (key) => {
  message.success(key)
  showDropdown.value = false
}
const handleClickOutside = () => {
  showDropdown.value = false
}
const nodeProps = ({ option }) => {
  return {
    onClick() {
      message.info(`[Click] ${option.label}`)
    },
    onContextmenu(e) {
      showDropdown.value = true
      xRef.value = e.clientX
      yRef.value = e.clientY

      e.preventDefault()
    },
  }
}
</script>

<template>
  <aside>
    <n-flex style="padding: 5px 10px" align="center" justify="space-between">
      <n-input size="small" placeholder="快速搜索" style="width: 200px" />
      <n-button circle quaternary @click="refreshTree">
        <n-icon size="20"><RefreshOutlined /></n-icon>
      </n-button>
    </n-flex>

    <n-tree block-line :data="data" :node-props="nodeProps" />
    <n-dropdown
      size="small"
      trigger="manual"
      placement="bottom-start"
      :show="showDropdown"
      :options="options"
      :x="xRef"
      :y="yRef"
      @select="handleSelect"
      @clickoutside="handleClickOutside"
    />
  </aside>
</template>

<style scoped></style>
