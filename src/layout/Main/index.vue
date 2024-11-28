<script setup>
import { useTabStore } from '@/stores/tab.js'
import { storeToRefs } from 'pinia'
import Welcome from '@/views/Welcome.vue'
import { MoreOutlined, CloseCircleOutlined, AliwangwangOutlined } from '@vicons/antd'
import { AutoAwesomeRound, AssistantPhotoFilled } from '@vicons/material'
import { computed, h } from 'vue'
import { renderIcon } from '@/utils/icon.js'
import { NIcon } from 'naive-ui'

const tabStore = useTabStore()

const { tabList, activeTab } = storeToRefs(tabStore)

const options = computed(() => {
  const tabs = [{ label: '关闭所有', key: 'close-all', icon: renderIcon(CloseCircleOutlined) }]

  if (tabs.length > 0) {
    tabs.push({ type: 'divider', key: 'right-options-divider' })
  }

  tabList.value.forEach((tab) => {
    const obj = {
      key: tab.name,
      label: tab.label,
    }
    if (tab.name === activeTab.value) {
      obj.icon = () => {
        return h(
          NIcon,
          { color: 'green', size: 20 },
          {
            default: () => h(AutoAwesomeRound),
          },
        )
      }
    }
    tabs.push(obj)
  })

  return tabs
})

// 标签关闭事件
function handleTabClose(name) {
  tabStore.removeTab(name)
}

function handleSelect(key) {
  switch (key) {
    case 'close-all':
      tabList.value = []
      break
    default:
      activeTab.value = key
  }
}
</script>
<template>
  <main>
    <!-- 无 Tab 页面时空显示 -->
    <Welcome v-if="tabList.length === 0" />

    <!-- Tab 页面 -->
    <n-tabs v-else size="small" v-model:value="activeTab" type="card" @close="handleTabClose">
      <n-tab-pane
        display-directive="show"
        v-for="tab in tabList"
        :key="tab.name"
        :tab="tab.label"
        :name="tab.name"
        closable
      >
        <template #tab>
          <n-popover trigger="hover" :delay="500">
            <template #trigger>
              <span>{{ tab.label }}</span>
            </template>
            <p>数据源：{{ tab.label }}</p>
            <p>类型：MySQL</p>
            <p>URL：jdbc:mysql//1.2.3.09:3306</p>
          </n-popover>
        </template>

        <!-- tab 页面内容组件 -->
        <component :is="tab.component" :key="tab.name" />
      </n-tab-pane>

      <!-- 标签栏后缀，一些统一操作按钮 -->
      <template #suffix>
        <n-dropdown
          size="small"
          style="max-height: 300px; overflow: auto"
          trigger="click"
          :options="options"
          @select="handleSelect"
        >
          <n-icon size="20" style="margin-right: 12px; cursor: pointer">
            <MoreOutlined />
          </n-icon>
        </n-dropdown>
      </template>
    </n-tabs>
  </main>
</template>
