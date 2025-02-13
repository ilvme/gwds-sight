<script setup>
import { NIcon } from 'naive-ui'
import { ArrowCircleUpFilled } from '@vicons/material'

// TODO 继续封装
defineOptions({ name: 'IconButton' })

defineProps({
  placement: {
    type: String,
    default: 'bottom',
    validator(value) {
      return [
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'left-start',
        'left',
        'left-end',
      ].includes(value)
    },
  },
  delay: {
    type: Number,
    default: 500,
  },
  iconSize: {
    type: Number,
    default: 22,
  },
  iconColor: {
    type: String,
    default: 'green',
  },
  icon: {
    type: String,
  },
})
</script>

<template>
  <n-tooltip trigger="hover" :delay="delay" :placement="placement">
    <template #trigger>
      <n-icon :size="iconSize" class="btn" color="green" disabled><ArrowCircleUpFilled /></n-icon>
    </template>
    提交
  </n-tooltip>
</template>

<style scoped></style>
