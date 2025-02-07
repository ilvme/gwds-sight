import fetcher from '@/utils/request.js'

// 获取数据
export const fetchData = (dataQuery) => fetcher.post('/data', dataQuery)
