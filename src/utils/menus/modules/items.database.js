import { renderIcon } from '@/utils/icon.js'
import { AddFilled, DeleteFilled, EditNoteRound, RefreshRound } from '@vicons/material'

export default {
  DATABASE_CREATE: {
    label: '新建数据库',
    key: 'DATABASE_CREATE',
    icon: renderIcon(AddFilled, { size: 18 }),
  },
  DATABASE_EDIT: {
    label: '编辑数据库',
    key: 'DATABASE_EDIT',
    icon: renderIcon(EditNoteRound, { size: 18 }),
  },
  DATABASE_REFRESH: {
    label: '刷新',
    key: 'DATABASE_REFRESH',
    icon: renderIcon(RefreshRound, { size: 18 }),
  },
  DATABASE_DELETE: {
    label: '删除数据库',
    key: 'DATABASE_DELETE',
    icon: renderIcon(DeleteFilled, { size: 18 }),
  },
}
