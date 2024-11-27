<script setup>
import { useTabStore } from '@/stores/tab.js'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import Welcome from '@/views/Welcome.vue'
import { Toast } from '@/utils/Layer.js'
import { MoreOutlined } from '@vicons/antd'

const tabStore = useTabStore()

const { tabList, activeTab } = storeToRefs(tabStore)

const closable = computed(() => tabList.value.length > 0)

// 标签关闭事件
function handleTabClose(name) {
  tabStore.removeTab(name)
}

const rightOptions = [{ label: '关闭所有', key: 'close-all' }]
function handleSelect(key) {
  switch (key) {
    case 'close-all':
      tabList.value = []
      break
    default:
      Toast.success(key)
  }
}
</script>
<template>
  <main>
    <Welcome v-if="tabList.length === 0" />
    <n-tabs
      v-else
      size="small"
      v-model:value="activeTab"
      type="card"
      :closable="closable"
      @close="handleTabClose"
    >
      <n-tab-pane
        display-directive="show"
        v-for="tab in tabList"
        :key="tab.name"
        :tab="tab.label"
        :name="tab.name"
        :closable="tab.closable"
      >
        <template #tab>
          <n-popover trigger="hover" :delay="500">
            <template #trigger>
              <span>{{ tab.label }}</span>
            </template>
            <p>数据源：mysql@1.2.3.09</p>
            <p>类型：MySQL</p>
            <p>URL：jdbc:mysql//1.2.3.09:3306</p>
          </n-popover>
        </template>

        <!-- 组件 -->
        <component :is="tab.component" :key="tab.name" />
      </n-tab-pane>

      <!-- 标签栏后缀，一些统一操作按钮 -->
      <template #suffix>
        <n-dropdown trigger="click" :options="rightOptions" @select="handleSelect">
          <n-icon size="20" style="margin-right: 12px; cursor: pointer">
            <MoreOutlined />
          </n-icon>
        </n-dropdown>
      </template>
    </n-tabs>
  </main>
</template>
