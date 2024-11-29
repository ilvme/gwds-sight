<script setup>
import { useBoolean } from '@/hooks/useBoolean.js'
import { h, nextTick, ref } from 'vue'
import InputEditor from '@/views/table/components/InputEditor.vue'
import { PlusRound } from '@vicons/material'
import { nanoid } from 'nanoid'
import { NButton, NIcon, NSelect } from 'naive-ui'

defineOptions({ name: 'TableCreatorAndEditor' })

const { bool: modalVisible, setTrue: showModal, setFalse: hiddenModal } = useBoolean(false)

const openModal = () => {
  showModal()
}
const activeTabName = ref('2')
const dataTypeOptions = [
  { label: 'varchar', value: 'varchar' },
  { label: 'int', value: 'int' },
  { label: 'bit', value: 'bit' },
]

const data = ref([])

// 列模板
const columns = [
  {
    title: '列名',
    key: 'columnName',
    width: 150,
    render(row) {
      const index = getDataIndex(row.key)
      return h(InputEditor, {
        value: row.columnName,
        onUpdateValue(v) {
          data.value[index].columnName = v
        },
      })
    },
  },
  {
    title: '数据类型',
    key: 'dataType',
    width: 150,
    render(row) {
      const index = getDataIndex(row.key)
      return h(NSelect, {
        size: 'small',
        filterable: true,
        value: row.dataType,
        options: dataTypeOptions,
        onUpdateValue(v) {
          data.value[index].dataType = v
        },
      })
    },
  },
  {
    title: '长度',
    key: 'length',
    width: 150,
    render(row) {
      const index = getDataIndex(row.key)
      return h(InputEditor, {
        value: row.length,
        onUpdateValue(v) {
          data.value[index].length = v
        },
      })
    },
  },
  {
    title: '非空',
    key: 'isNull',
    width: 150,
    render(row) {
      const index = getDataIndex(row.key)
      return h(InputEditor, {
        value: row.isNull,
        onUpdateValue(v) {
          data.value[index].isNull = v
        },
      })
    },
  },
  {
    title: '默认值',
    key: 'defaultValue',
    width: 150,
    render(row) {
      const index = getDataIndex(row.key)
      return h(InputEditor, {
        value: row.defaultValue,
        onUpdateValue(v) {
          data.value[index].defaultValue = v
        },
      })
    },
  },
  {
    title: '描述',
    key: 'description',
    width: 150,
    render(row) {
      const index = getDataIndex(row.key)
      return h(InputEditor, {
        value: row.description,
        onUpdateValue(v) {
          data.value[index].description = v
        },
      })
    },
  },
]
const getDataIndex = (key) => {
  return data.value.findIndex((item) => item.key === key)
}

const addRow = () => {
  data.value.push({
    key: nanoid(),
    columnName: 'columnName',
    dataType: '啊啊',
    length: 10,
    defaultValue: '默认值啊',
    description: '描述信息',
  })
}

// 右键菜单相关
const currentClickRow = ref(null)
const showDropdown = ref(false)
const xRef = ref(0)
const yRef = ref(0)
function handleSelect(key) {
  switch (key) {
    case 'add':
      addRow()
      break
    case 'delete':
      data.value.splice(getDataIndex(currentClickRow.value.key), 1)
      break
  }
  showDropdown.value = false
}
function onClickoutside() {
  showDropdown.value = false
}
const options = [
  { label: '新增列', key: 'add' },
  {
    label: () => h('span', { style: { color: 'red' } }, '删除列'),
    key: 'delete',
  },
]
// 密码保存方式
const aaaa = ref('')

defineExpose({ openModal })
</script>

<template>
  <n-modal
    v-model:show="modalVisible"
    preset="card"
    title="创建表"
    style="width: 900px; height: 600px"
  >
    <n-tabs placement="left" type="line" size="small" v-model:value="activeTabName">
      <n-tab-pane tab="基本信息" name="1">
        <n-form label-placement="left" label-width="80px" label-align="left" size="small">
          <n-form-item label="名称"><n-input /></n-form-item>
          <n-form-item label="注释"><n-input /></n-form-item>
          <n-form-item label="引擎"><n-input /> </n-form-item>
          <n-form-item label="排序规则">
            <n-select
              v-model:value="aaaa"
              :options="[
                { label: '从不', value: '1' },
                { label: '直到重启', value: '2' },
                { label: '直到会话', value: '3' },
                { label: '永久', value: '4' },
              ]"
            />
          </n-form-item>
          <n-form-item label="字符集"><n-input /> </n-form-item>
        </n-form>
      </n-tab-pane>
      <n-tab-pane tab="列信息" name="2">
        <n-flex style="margin-bottom: 5px">
          <n-button @click="addRow" size="small" type="primary">
            <template #icon>
              <n-icon>
                <PlusRound />
              </n-icon>
            </template>
            添加列
          </n-button>
        </n-flex>

        <n-data-table
          bordered
          size="small"
          :columns="columns"
          :data="data"
          :key="(row) => row.key"
          style="height: 400px; width: 750px"
          flex-height
          :rowProps="
            (row) => {
              return {
                onContextmenu: (e) => {
                  e.preventDefault()
                  showDropdown = false
                  nextTick().then(() => {
                    currentClickRow = row
                    showDropdown = true
                    xRef = e.clientX
                    yRef = e.clientY
                  })
                },
              }
            }
          "
        >
          <template #empty>请点击上方添加列</template>
        </n-data-table>
        <n-dropdown
          placement="bottom-start"
          trigger="manual"
          :x="xRef"
          :y="yRef"
          :options="options"
          :show="showDropdown"
          :on-clickoutside="onClickoutside"
          @select="handleSelect"
        />
      </n-tab-pane>
    </n-tabs>

    <template #action>
      <n-space justify="center">
        <n-button type="primary" @click="hiddenModal">确定</n-button>
        <n-button @click="hiddenModal">取消</n-button>
        <n-button type="success" @click="hiddenModal">生成创建表脚本</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped></style>
