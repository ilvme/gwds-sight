import { renderIcon } from '@/utils/icon.js'
import { AddFilled, EditNoteRound, RefreshRound } from '@vicons/material'

export const TREE_RIGHT_CLICK_MENUS = {
  // 通用分隔符
  DIVIDER: { key: '9999', type: 'divider' },

  // 数据源操作
  DATASOURCE_CREATE: {
    label: '新建数据源',
    key: 'DATASOURCE_CREATE',
    icon: renderIcon(AddFilled, {
      size: 18,
    }),
  },
  DATASOURCE_EDIT: {
    label: '编辑连接',
    key: 'DATASOURCE_EDIT',
    icon: renderIcon(EditNoteRound, {
      size: 18,
    }),
  },
  DATASOURCE_REFRESH: {
    label: '刷新',
    key: 'DATASOURCE_REFRESH',
    icon: renderIcon(RefreshRound, {
      size: 18,
    }),
  },

  // 系统数据库文件夹

  // 用户数据库文件夹（VC 文件夹）

  // VC

  // 数据库

  // 表

  // 视图

  // 存储过程

  // 函数

  // SQL 编辑器
  SQL_CONSOLE: { label: 'SQL 编辑器', key: 'SQL_CONSOLE' },

  // 用户与权限
  // 会话信息
  // 系统信息
  // 审计信息
  // 资源管理
}
