<script setup>
import { ref, h } from 'vue'
import { NIcon } from 'naive-ui'
import { DatabaseFilled, FolderFilled } from '@vicons/antd'

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
      },
      {
        key: '1-2',
        label: '用户数据库',
        prefix: () =>
          h(NIcon, null, {
            default: () => h(FolderFilled),
          }),
      },
      { key: '1-3', label: '用户与权限' },
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
</script>

<template>
  <n-input placeholder="快速搜索" />

  <n-tree :data="data" expand-on-click block-line />
</template>

<style scoped></style>
