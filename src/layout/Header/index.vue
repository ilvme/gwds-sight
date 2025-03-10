<script setup>
import { computed, ref, useTemplateRef } from 'vue'
import Preferences from '@/views/preferences/index.vue'
import DatasourceCreator from '@/views/datasource/create.vue'
import { useTabStore } from '@/stores/tab.js'
import { nanoid } from 'nanoid'
import { NAV_MENUS } from '@/utils/menus/nav.js'
import { Toast } from '@/utils/Layer.js'
import { AutoAwesomeRound } from '@vicons/material'

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

// 多语言支持

const language = ref('zh-CN')
function handleLangChange(val) {
  language.value = val
}

const langText = computed(() => {
  switch (language.value) {
    case 'zh-CN':
      return '简'
    case 'en-US':
      return 'En'
    default:
      return '未知'
  }
})
</script>

<template>
  <header class="header">
    <n-flex align="center">
      <n-flex justify="center" align="center" size="small" class="logo">
        <n-icon><AutoAwesomeRound /> </n-icon>GWDS
      </n-flex>

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
    </n-flex>

    <!-- 快捷操作区域 -->
    <n-dropdown
      :options="[
        { label: '中文简体', key: 'zh-CN' },
        { label: 'English', key: 'en-US' },
      ]"
      @select="handleLangChange"
      :value="language"
    >
      <n-text
        style="margin-right: 20px; color: white; font-size: 18px; cursor: pointer"
        trigger="hover"
      >
        {{ langText }}
      </n-text>
    </n-dropdown>

    <!-- 首选项弹窗 -->
    <Preferences ref="preferencesRef" />

    <!-- 创建数据源 -->
    <DatasourceCreator ref="datasourceCreatorRef" />
  </header>

  <n-divider style="margin: 0" />
</template>

<style scoped>
.header {
  height: 50px;
  display: flex;
  justify-content: space-between;
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
