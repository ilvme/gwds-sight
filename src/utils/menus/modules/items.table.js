import { renderIcon } from '@/utils/icon.js'
import { RefreshRound } from '@vicons/material'

export default {
  TABLE_OPEN: { label: '打开表', key: 'TABLE_OPEN' },
  TABLE_CREATE: { label: '新建表', key: 'TABLE_CREATE' },
  TABLE_RENAME: { label: '重命名表', key: 'TABLE_RENAME' },
  TABLE_EDIT: { label: '编辑表', key: 'TABLE_EDIT' },
  TABLE_DELETE: { label: '删除表', key: 'TABLE_DELETE' },
  TABLE_CLEAR: { label: '清空表', key: 'TABLE_CLEAR' },
  TABLE_TRUNCATE: { label: '截断表', key: 'TABLE_TRUNCATE' },
  TABLE_EXPORT: { label: '导出', key: 'TABLE_EXPORT' },
  TABLE_IMPORT: { label: '导入', key: 'TABLE_IMPORT' },
  TABLE_REFRESH: {
    label: '刷新',
    key: 'TABLE_REFRESH',
    icon: renderIcon(RefreshRound, { size: 18 }),
  },
}
