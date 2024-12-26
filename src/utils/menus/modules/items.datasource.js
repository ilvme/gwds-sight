import { renderIcon } from '@/utils/icon.js'
import { AddFilled, EditNoteRound, RefreshRound } from '@vicons/material'

export default {
  DATASOURCE_CREATE: {
    label: '新建数据源',
    key: 'DATASOURCE_CREATE',
    icon: renderIcon(AddFilled, { size: 18 }),
  },
  DATASOURCE_EDIT: {
    label: '编辑连接',
    key: 'DATASOURCE_EDIT',
    icon: renderIcon(EditNoteRound, { size: 18 }),
  },
  DATASOURCE_REFRESH: {
    label: '刷新',
    key: 'DATASOURCE_REFRESH',
    icon: renderIcon(RefreshRound, { size: 18 }),
  },
}
