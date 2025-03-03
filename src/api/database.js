import fetcher from '@/utils/request.js'

/**
 * 新建数据源
 */
export const createDatabase = (database) => fetcher.post('/database', database)

/**
 * 删除数据源
 */
export const deleteDatabase = (datasourceId, databaseName) =>
  fetcher.delete(`/database`, { params: { databaseName, datasourceId } })
