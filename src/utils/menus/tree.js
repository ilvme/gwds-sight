import { DIVIDER, ITEMS } from '@/utils/menus/Items.js'

export const getMenuByNodeType = (node) => {
  switch (node.nodeType) {
    case 'ds':
      return [
        ITEMS.SQL_CONSOLE,
        DIVIDER(),
        ITEMS.DATASOURCE_CREATE, // 新建数据源
        ITEMS.DATASOURCE_EDIT, // 编辑连接
        ITEMS.DATASOURCE_RENAME, // 重命名
        DIVIDER(), // 分割线
        ITEMS.DATABASE_CREATE, // 新建数据库
        DIVIDER(), // 分割线
        ITEMS.DATASOURCE_REMOVE, // 移除数据源
        DIVIDER(), // 分割线
        ITEMS.DATASOURCE_REFRESH, // 刷新
      ]
    case 'db':
      return [
        ITEMS.SQL_CONSOLE,
        DIVIDER(),
        ITEMS.TABLE_CREATE,
        ITEMS.VIEW_CREATE,
        ITEMS.PROCEDURE_CREATE,
        DIVIDER(),
        ITEMS.DATABASE_CREATE,
        ITEMS.DATABASE_EDIT,
        DIVIDER(),
        ITEMS.DATABASE_DELETE,
        DIVIDER(),
        ITEMS.DATABASE_REFRESH,
      ]
    case 'tf':
      return [ITEMS.SQL_CONSOLE, DIVIDER(), ITEMS.TABLE_CREATE, DIVIDER(), ITEMS.TABLE_REFRESH]
    case 't':
      return [
        ITEMS.SQL_CONSOLE,
        DIVIDER(),
        ITEMS.TABLE_OPEN,
        DIVIDER(),
        ITEMS.TABLE_RENAME,
        ITEMS.TABLE_EDIT,
        DIVIDER(),
        ITEMS.TABLE_CLEAR,
        ITEMS.TABLE_DELETE,
        ITEMS.TABLE_TRUNCATE,
        DIVIDER(),
        ITEMS.TABLE_EXPORT,
        ITEMS.TABLE_IMPORT,
        DIVIDER(),
        ITEMS.TABLE_REFRESH,
      ]
    default:
      return []
  }
}
