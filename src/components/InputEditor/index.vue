<script setup>
import { nextTick, ref, useTemplateRef } from 'vue'

defineOptions({ name: 'InputEditor' })

const props = defineProps({
  value: [String, Number],
  onUpdateValue: [Function, Array],
})
const isEdit = ref(false)
const inputRef = useTemplateRef('inputRef')
const inputValue = ref(props.value)

function handleOnClick() {
  isEdit.value = true
  nextTick(() => {
    inputRef.value.focus()
  })
}
function handleChange() {
  props.onUpdateValue(inputValue.value)
  isEdit.value = false
}
</script>

<template>
  <div v-if="!isEdit" style="min-height: 22px" @click="handleOnClick">
    {{ props.value }}
  </div>

  <n-input
    v-else
    ref="inputRef"
    :value="inputValue"
    @updateValue="
      (v) => {
        inputValue = v
      }
    "
    @change="handleChange"
    @blur="handleChange"
  />
</template>

<style scoped></style>
