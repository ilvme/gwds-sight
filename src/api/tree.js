import fetcher from '@/utils/request.js'

export const fetchTree = (datasourceId = null, node = null) =>
  fetcher.post('/tree', {
    datasourceId,
    parent: node,
  })
