<script setup>
import { useTemplateRef } from 'vue'
import Preferences from '@/views/preferences/index.vue'
import DatasourceCreator from '@/views/datasource/create.vue'
import { useTabStore } from '@/stores/tab.js'
import { nanoid } from 'nanoid'
import { NAV_MENUS } from '@/utils/menus/nav.js'
import { Toast } from '@/utils/Layer.js'

const preferencesRef = useTemplateRef('preferencesRef')
const datasourceCreatorRef = useTemplateRef('datasourceCreatorRef')

const { addTab } = useTabStore()

function handleSelect(key) {
  switch (key) {
    case 'preferences':
      preferencesRef.value.openModal()
      break
    case 'datasource-create':
      datasourceCreatorRef.value.openModal()
      break
    case 'nav-sql-console':
      addTab({
        label: 'SQL 编辑器[mysql@localhost]',
        name: nanoid(),
        props: {
          type: 'SQL_CONSOLE',
          age: 18,
        },
      })
      break
    default:
      Toast.success('你点击⚡️了' + key)
  }
}
</script>

<template>
  <header class="header">
    <div class="logo">GWDS</div>

    <nav>
      <n-dropdown
        size="small"
        trigger="hover"
        :key="menu.title"
        v-for="menu in NAV_MENUS"
        :options="menu.options"
        @select="handleSelect"
      >
        <span class="menu-title">
          {{ menu.title }}
        </span>
      </n-dropdown>
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
.menu-title {
  cursor: default;
}
.menu-title:hover {
  color: salmon;
}
</style>
