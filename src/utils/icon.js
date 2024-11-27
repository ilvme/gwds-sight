import { h } from 'vue'
import { NIcon } from 'naive-ui'

export function renderIcon(icon) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    })
  }
}
