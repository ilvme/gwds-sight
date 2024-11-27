<script setup>
import { useTabStore } from '@/stores/tab.js'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

// const key = ref('1')
const tabStore = useTabStore()

const { tabList, activeTab } = storeToRefs(tabStore)

const closable = computed(() => tabList.value.length > 1)

// 标签关闭事件
function handleTabClose(name) {
  tabStore.removeTab(name)
}
</script>
<template>
  <n-tabs
    size="small"
    v-model:value="activeTab"
    type="card"
    :closable="closable"
    @close="handleTabClose"
  >
    <!--    <n-tab-pane name="1">-->
    <!--      <template #tab>-->
    <!--        <n-popover trigger="hover" :delay="500">-->
    <!--          <template #trigger>-->
    <!--            <span>SQL 编辑器[mysql@1.2.3.09]</span>-->
    <!--          </template>-->
    <!--          <p>数据源：mysql@1.2.3.09</p>-->
    <!--          <p>类型：MySQL</p>-->
    <!--          <p>URL：jdbc:mysql//1.2.3.09:3306</p>-->
    <!--        </n-popover>-->
    <!--      </template>-->

    <!--      <SQLConsole />-->
    <!--    </n-tab-pane>-->

    <!--    <n-tab-pane tab="t_address[gbase@localhost]" name="3">-->
    <!--      <DataOperation />-->
    <!--    </n-tab-pane>-->

    <n-tab-pane
      display-directive="show"
      v-for="tab in tabList"
      :key="tab.name"
      :tab="tab.label"
      :name="tab.name"
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
</template>
