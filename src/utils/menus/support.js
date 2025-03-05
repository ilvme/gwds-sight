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
  /**
   * 从 key 中解析出数据库名称
   * @param key
   * @returns {*}
   */
  parseDatabaseName(key) {
    if (!key) return
    if (key.startsWith('ds-')) return
    const arr = key.split('-')
    return arr[arr.length - 2]
  },
}

export default TreeUtil
