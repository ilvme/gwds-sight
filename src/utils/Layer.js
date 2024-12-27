export const Toast = {
  comingSoon() {
    window.$message.warning('功能即将上线')
  },
  cancel() {
    window.$message.warning('您已取消操作')
  },
  success(message) {
    window.$message.warning(message)
  },
  info(message) {
    window.$message.warning(message)
  },
  warning(message) {
    window.$message.warning(message)
  },
  error(message) {
    window.$message.warning(message)
  },
}

export const Layer = {
  error(content) {
    window.$notification.error({
      content,
      title: '系统提示',
      duration: 2500,
      keepAliveOnHover: true,
    })
  },
}
