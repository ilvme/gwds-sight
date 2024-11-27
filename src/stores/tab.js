import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'

import DataOperation from '@/views/data/index.vue'
import SQLConsole from '@/views/sql-console/index.vue'

export const useTabStore = defineStore('tab', () => {
  const tabList = ref([])
  const activeTab = ref(null)

  /**
   * 添加 Tab 页
   * @param label 标签页 title
   * @param name 标签页 唯一标识
   * @param props 自定义参数
   * @returns {Promise<void>}
   */
  async function addTab({ label, name, props }) {
    tabList.value.push({
      label,
      name,
      props,
      component: shallowRef(loadView(props.type)),
    })

    activeTab.value = name
  }

  // 删除 Tab 页
  function removeTab(name) {
    const removeIndex = tabList.value.findIndex((item) => item.name === name)
    if (removeIndex === -1) return
    tabList.value.splice(removeIndex, 1)
    if (name === activeTab.value) {
      activeTab.value = tabList.value[Math.min(removeIndex, tabList.value.length - 1)].name
    }
  }

  return { tabList, activeTab, addTab, removeTab }
})

// tab 页面类型映射
const loadView = (type) => {
  return MODULE_MAPPINGS[type]
}
const MODULE_MAPPINGS = {
  SQL_CONSOLE: SQLConsole,
  DATA_OPERATION: DataOperation,
}
