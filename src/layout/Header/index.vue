<script setup>
import { h, useTemplateRef } from 'vue'
import { NIcon, useMessage } from 'naive-ui'
import { SettingFilled, LogoutOutlined, FileAddOutlined, CloudUploadOutlined } from '@vicons/antd'
import { HelpFilled } from '@vicons/material'
import Preferences from '@/views/preferences/index.vue'
import DatasourceCreator from '@/views/datasource/create.vue'
import { useTabStore } from '@/stores/tab.js'
import { nanoid } from 'nanoid'
import { renderIcon } from '@/utils/icon.js'

const options1 = [
  { label: '首选项', key: 'preferences', icon: renderIcon(SettingFilled) },
  { label: '新窗口打开', key: '2' },
  { type: 'divider' },
  { label: '退出', key: 'logout', icon: renderIcon(LogoutOutlined) },
]

const options2 = [
  { label: '新建数据源', key: 'datasource-create', icon: renderIcon(FileAddOutlined) },
  { label: '驱动管理', key: 'the beverly hills hotel, los angeles' },
]

const options3 = [
  { label: 'SQL 模板', key: 'marina bay sands' },
  { label: '我的 SQL', key: "brown's hostel, london" },
  { label: '导入导出', key: 'atlantis nahamas, nassau', icon: renderIcon(CloudUploadOutlined) },
]

const options4 = [
  { label: '关于', key: "brown's hos dtel, london" },
  { label: '帮助', key: 'marina bay sands', icon: renderIcon(HelpFilled) },
  { type: 'divider' },
  { label: '快捷键', key: 'atlantis nahamas, nassau' },
]
const message = useMessage()
const preferencesRef = useTemplateRef('preferencesRef')
const datasourceCreatorRef = useTemplateRef('datasourceCreatorRef')
function handleSelect(key) {
  console.log(key)
  switch (key) {
    case 'preferences':
      preferencesRef.value.openModal()
      break
    case 'datasource-create':
      datasourceCreatorRef.value.openModal()
      break
    default:
      message.success('你惦记了' + key)
  }
}

const tabStore = useTabStore()
const testTab = () => {
  tabStore.addTab({
    label: 'SQL 编辑器[mysql@localhost]',
    name: nanoid(),
    props: {
      type: 'SQL_CONSOLE',
      age: 18,
    },
  })
}
</script>

<template>
  <header class="header">
    <div class="logo">GWDS</div>

    <nav>
      <n-dropdown size="small" trigger="hover" :options="options1" @select="handleSelect">
        文件
      </n-dropdown>
      <n-dropdown size="small" trigger="hover" :options="options2" @select="handleSelect">
        数据库
      </n-dropdown>
      <n-dropdown size="small" trigger="hover" :options="options3" @select="handleSelect">
        SQL
      </n-dropdown>
      <n-dropdown size="small" trigger="hover" :options="options4" @select="handleSelect">
        帮助
      </n-dropdown>
      <n-button @click="testTab">
        <span style="color: white">Tab 页面测试</span>
      </n-button>
    </nav>

    <!-- 首选项弹窗 -->
    <Preferences ref="preferencesRef" />

    <!-- 创建数据源 -->
    <DatasourceCreator ref="datasourceCreatorRef" />
  </header>
</template>

<style scoped>
.header {
  height: 50px;
  background-color: #2c2c2c;
  color: white;
  display: flex;
  align-items: center;
}

.logo {
  padding: 0 16px;
  font-size: 1.8em;
  font-weight: bold;
}

nav {
  display: flex;
  gap: 20px;
  margin-left: 40px;
  font-size: 1.2em;
}
</style>
