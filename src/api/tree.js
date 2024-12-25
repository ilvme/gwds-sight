import axios from 'axios'

export const fetchTree = (datasourceId = null, node = null) =>
  axios.post('api/tree', {
    datasourceId,
    parent: node,
  })
