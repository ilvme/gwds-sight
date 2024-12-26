import { h } from 'vue'
import { NIcon } from 'naive-ui'
import {
  BackupTableRound,
  CodeRound,
  FolderRound,
  TableRowsRound,
  ViewListRound,
  WindowRound,
} from '@vicons/material'

export function renderIcon(icon, props = null) {
  return () => {
    return h(NIcon, props, {
      default: () => h(icon),
    })
  }
}

export function getTreeIconByNodeType(treeNode) {
  const type = treeNode.nodeType
  switch (type) {
    case 'ds':
      return ViewListRound
    case 'db':
      return TableRowsRound
    case 't':
      return WindowRound
    case 'v':
      return BackupTableRound
    case 'p':
      return CodeRound

    case 'tf':
    case 'vf':
    case 'pf':
    case 'sof':
    default:
      return FolderRound
  }
}
