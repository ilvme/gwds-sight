import { reactive } from 'vue'

// 树节点操作类型
export const OP_TYPE_LIST = {
  REMOVE: 'REMOVE', // 移除树节点
  ADD: 'ADD', // 添加树节点
  RENAME: 'RENAME',
}

// TODO 优化参数设计，化繁为简
export const treeStore = reactive({
  flag: false,

  opType: null, // 操作类型remove, add

  parentKey: null, // 当前操作节点的父节点 key
  targetNode: null, // 待操作树节点，新增类型则为新增节点信息；删除类型则为待删除节点信息；重命名类型则为新节点信息

  oldNode: null, // 待操作树节点，重命名时的旧节点数据

  // 刷新树总控
  refresh(opType, targetNode, parentKey = null, oldNode = null) {
    if (!Object.values(OP_TYPE_LIST).includes(opType)) {
      throw new Error('opType is not valid')
    }
    this.opType = opType
    this.targetNode = targetNode
    this.oldNode = oldNode
    this.parentKey = parentKey
    this.flag = !this.flag
  },
})
