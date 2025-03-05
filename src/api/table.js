import fetcher from '@/utils/request.js'

/**
 * 重命名
 */
export const renameTable = (data) => fetcher.put('/table/rename', data)
