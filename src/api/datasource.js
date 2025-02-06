import fetcher from '@/utils/request.js'

/**
 * 新建数据源
 */
export const createDatasource = (datasource) => fetcher.post('/datasource', datasource)

/**
 * 删除数据源
 */
export const deleteDatasource = (datasourceId) => fetcher.delete(`/datasource/${datasourceId}`)

/**
 * 更新数据源
 */
export const updateDatasource = (datasource) => fetcher.put('/datasource', datasource)

/**
 * 获取数据源列表
 */
export const fetchDatasourceList = () => fetcher.get('/datasource')

/**
 * 获取数据源详情
 */
export const fetchDatasource = (datasourceId) => fetcher.get(`/datasource/${datasourceId}`)
