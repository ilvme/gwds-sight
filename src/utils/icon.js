import { h } from 'vue'
import { NIcon } from 'naive-ui'

export function renderIcon(icon, props = null) {
  return () => {
    return h(NIcon, props, {
      default: () => h(icon),
    })
  }
}
