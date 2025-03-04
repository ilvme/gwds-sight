const TreeUtil = {
  /**
   * 从 key 中解析出 datasourceId
   * @param key
   * @returns {*}
   */
  parseDatasourceId: (key) => {
    if (!key) return
    const arr = key.split('-')
    return arr[arr.length - 1]
  },
  /**
   * 从 key 中解析并生成数据源的 key
   * @param key
   * @returns {*}
   */
  buildDatasourceKey: (key) => {
    if (!key) return
    const arr = key.split('-')
    return 'ds-' + arr[arr.length - 1]
  },
}

export default TreeUtil
