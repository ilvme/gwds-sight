import { reactive } from 'vue'

export const treeStore = reactive({
  flag: false,

  refresh() {
    this.flag = !this.flag
  },
})
