<script setup>
import {
  ArrowCircleUpFilled,
  KeyboardArrowDownRound,
  KeyboardArrowLeftFilled,
  KeyboardArrowRightRound,
  KeyboardDoubleArrowLeftFilled,
  KeyboardDoubleArrowRightOutlined,
  MinusOutlined,
  PlusOutlined,
  RefreshOutlined,
} from '@vicons/material'
import { NIcon } from 'naive-ui'
import { computed, h, onMounted, ref } from 'vue'
import { fetchData } from '@/api/data.js'
import InputEditor from '@/components/InputEditor/index.vue'
import { nanoid } from 'nanoid'

defineOptions({ name: 'DataOperation' })
const props = defineProps({
  // 初始化所需数据，如果是来自 Tab 页面需要解析数据源、数据库、表名等
  meta: { type: Object, default: () => ({}) },
})

// sourceNode 点击的树节点数据
const sourceNode = ref(props.meta.sourceNode)

// 表格数据与列信息
const dataMap = ref([])
const columns = ref([])
const totalRows = ref(0)

const loading = ref(false)

onMounted(async () => {
  console.log('node：', sourceNode.value)
  await initTable()
})

// 初始化表格列信息
const initializedCol = {
  width: 'auto',
  minWidth: 100,
  resizable: true,
  sorter: 'default',
}
// 初始化表格数据
async function initTable() {
  dataMap.value = []
  loading.value = true
  const arr = sourceNode.value.key.split('-')
  const [, tableName, databaseName, datasourceId] = arr
  const res = await fetchData({
    datasourceId,
    databaseName,
    tableName,
    where: where.value,
    orderBy: orderBy.value,
    pageSize: pageSize.value,
    pageNum: pageNum.value,
  })
  const { columnNameList, dataMapList, total } = res.data.data
  totalRows.value = total

  // 行数据手动添加 _$_key
  dataMapList.forEach((item, index) => {
    item._$_key = nanoid() + index
  })
  dataMap.value = dataMapList

  // 列信息处理
  let cs = []
  columnNameList.forEach((item) => {
    cs.push({
      ...initializedCol,
      title: item,
      key: item,
      render(row) {
        const index = getDataIndex(row._$_key)
        return h(InputEditor, {
          value: row[item],
          onUpdateValue(v) {
            dataMap.value[index][item] = v
          },
        })
      },
    })
  })
  columns.value = cs

  loading.value = false
}

// 获取数据索引
const getDataIndex = (key) => {
  return dataMap.value.findIndex((item) => item._$_key === key)
}

// 重新加载数据
function reloadData() {
  initTable()
}
// 提交更改
async function onSubmit() {
  console.log(dataMap.value)
}

// 页数据量大小
const options = [
  { label: '页面大小', key: 'never', disabled: true },
  { label: 5, key: 5 },
  { label: 10, key: 10 },
  { label: 20, key: 20 },
  { label: 50, key: 50 },
  { label: 100, key: 100 },
  { label: 250, key: 250 },
  { label: 500, key: 500 },
]
const pageNum = ref(1)
const pageSize = ref(20)
function handleChangePageSize(key) {
  pageSize.value = key
}

// 搜索条件
// const where = ref("id = 'aaa'")
const where = ref('')

// 排序条件
const orderBy = ref('')

// 条件输入提示，即列字段组成的数组
const searchTips = computed(() => columns.value.map((item) => item.title))

const tipOption = computed(() => {
  return searchTips.value.filter((item) => item.includes(where.value))
})
</script>

<template>
  <div>
    <!-- 操作栏区域 -->
    <n-flex size="small" align="center">
      <n-flex :size="5" align="center">
        <n-popover trigger="hover" :delay="500" placement="bottom">
          <template #trigger>
            <n-icon size="22" class="btn">
              <KeyboardDoubleArrowLeftFilled />
            </n-icon>
          </template>
          第一页
        </n-popover>
        <n-popover trigger="hover" :delay="500" placement="bottom">
          <template #trigger>
            <n-icon size="22" class="btn"><KeyboardArrowLeftFilled /></n-icon>
          </template>
          上一页
        </n-popover>

        <n-dropdown
          placement="bottom"
          trigger="click"
          size="small"
          :options="options"
          @select="handleChangePageSize"
        >
          <n-flex size="small" align="center" style="cursor: pointer !important">
            <span>第 {{ pageNum }} 页 / 每页 {{ pageSize }} / 共 {{ totalRows }} 行</span>

            <n-icon><KeyboardArrowDownRound /></n-icon>
          </n-flex>
        </n-dropdown>

        <n-popover trigger="hover" :delay="500" placement="bottom">
          <template #trigger>
            <n-icon size="22" class="btn"><KeyboardArrowRightRound /></n-icon>
          </template>
          下一页
        </n-popover>
        <n-popover trigger="hover" :delay="500" placement="bottom">
          <template #trigger>
            <n-icon size="22" class="btn"><KeyboardDoubleArrowRightOutlined /></n-icon>
          </template>
          最后一页
        </n-popover>
      </n-flex>
      <n-popover trigger="hover" :delay="500" placement="bottom">
        <template #trigger>
          <n-icon size="22" class="btn" @click="reloadData"><RefreshOutlined /></n-icon>
        </template>
        重新加载数据
      </n-popover>

      <n-divider vertical />

      <n-popover trigger="hover" :delay="500" placement="bottom">
        <template #trigger>
          <n-icon size="22" class="btn"><PlusOutlined /></n-icon>
        </template>
        添加行
      </n-popover>
      <n-popover trigger="hover" :delay="500" placement="bottom">
        <template #trigger>
          <n-icon size="22" class="btn"><MinusOutlined /></n-icon>
        </template>
        删除行
      </n-popover>
      <n-popover trigger="hover" :delay="500" placement="bottom">
        <template #trigger>
          <n-icon size="22" class="btn" color="green" @click="onSubmit">
            <ArrowCircleUpFilled />
          </n-icon>
        </template>
        提交更改
      </n-popover>
    </n-flex>

    <!-- 搜索条件栏 -->
    <n-flex style="margin-top: 5px; margin-bottom: 5px">
      <n-flex size="small">
        WHERE
        <n-auto-complete
          style="width: 300px"
          size="small"
          v-model:value="where"
          :input-props="{ autocomplete: 'disabled' }"
          :options="tipOption"
          clearable
        />
      </n-flex>
      <n-flex size="small">
        ORDER BY
        <n-auto-complete
          style="width: 240px"
          size="small"
          v-model:value="orderBy"
          :input-props="{ autocomplete: 'disabled' }"
          :options="tipOption"
          clearable
        />
      </n-flex>
    </n-flex>

    <!-- 数据区域 -->
    <n-data-table
      v-if="columns.length > 0"
      :loading="loading"
      size="small"
      :columns="columns"
      :data="dataMap"
      bordered
      :single-line="false"
      max-height="calc(100vh - 280px)"
      :scroll-x="300"
      :row-key="(row) => row._$_key"
    />
    <n-empty v-else description="没有任何数据" />
  </div>
</template>

<style scoped>
.btn {
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn:hover {
  background-color: #f3f2f2;
}
</style>
