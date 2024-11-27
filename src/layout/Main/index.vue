<script setup>
import { useTabStore } from '@/stores/tab.js'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import Welcome from '@/views/Welcome.vue'

// const key = ref('1')
const tabStore = useTabStore()

const { tabList, activeTab } = storeToRefs(tabStore)

const closable = computed(() => tabList.value.length > 0)

// 标签关闭事件
function handleTabClose(name) {
  tabStore.removeTab(name)
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
        <component :is="tab.component" :key="tab.name" />
      </n-tab-pane>
    </n-tabs>
  </main>
</template>
