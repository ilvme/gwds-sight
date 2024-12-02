import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const langSupport = ref([])
  const language = ref('zh-CN')

  return { langSupport, language }
})
