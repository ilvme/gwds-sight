import { reactive } from 'vue'

export const treeStore = reactive({
  flag: false,
  node: null,
  opType: '', // remove, add

  // 刷新树, type: remove, add
  refresh(newNode, type) {
    this.node = newNode
    this.opType = type
    this.flag = !this.flag
  },
})
