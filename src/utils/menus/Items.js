import { nanoid } from 'nanoid'
import DATASOURCE_ITEMS from './modules/items.datasource.js'
import TABLE_ITEMS from './modules/items.table.js'
import DATABASE_ITEMS from './modules/items.database.js'
import VIEW_ITEMS from './modules/items.view.js'
import PROCEDURE_ITEMS from './modules/items.procedure.js'

export const DIVIDER = (key = nanoid()) => ({ key, type: 'divider' })

export const ITEMS = {
  ...DATASOURCE_ITEMS, // 数据源操作
  ...DATABASE_ITEMS, // 数据库
  ...TABLE_ITEMS, // 表
  ...VIEW_ITEMS, // 视图
  ...PROCEDURE_ITEMS, // 存储过程

  // SQL 编辑器
  SQL_CONSOLE: { label: 'SQL 编辑器', key: 'SQL_CONSOLE' },

  // 用户与权限
  // 会话信息
}
