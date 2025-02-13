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
const data = ref([])
const columns = ref([])

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
}
// 初始化表格数据
async function initTable() {
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
    pageNum: 1,
  })
  const { columnNameList, dataMapList } = res.data.data
  let cs = []
  columnNameList.forEach((item) => {
    cs.push({
      ...initializedCol,
      title: item,
      key: item,
      render(row) {
        const index = getDataIndex(row._key)
        return h(InputEditor, {
          value: row[item],
          onUpdateValue(v) {
            data.value[index][item] = v
          },
        })
      },
    })
  })
  columns.value = cs
  dataMapList.forEach((item, index) => {
    item._key = nanoid() + index
  })
  data.value = dataMapList

  loading.value = false
}

// 获取数据索引
const getDataIndex = (key) => {
  return data.value.findIndex((item) => item._key === key)
}

// 分页
const options = [
  { label: 10, key: 10 },
  { label: 20, key: 20 },
  { label: 50, key: 50 },
  { label: 100, key: 100 },
  { label: 250, key: 250 },
  { label: 500, key: 500 },
]
const pageSize = ref(20)
function handleChangePageSize(key) {
  pageSize.value = key
}

// 搜索条件
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
    <!-- 操作栏 -->
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
        <div>
          <n-dropdown
            placement="bottom"
            trigger="click"
            size="small"
            :options="options"
            @select="handleChangePageSize"
          >
            <n-flex size="small" align="center" style="cursor: pointer !important">
              <span>{{ pageSize + '行' }}</span>
              <n-icon><KeyboardArrowDownRound /></n-icon>
            </n-flex>
          </n-dropdown>
        </div>
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
          <n-icon size="22" class="btn"><RefreshOutlined /></n-icon>
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
          <n-icon size="22" class="btn"><ArrowCircleUpFilled /></n-icon>
        </template>
        提交
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
      v-if="data.length > 0"
      :loading="loading"
      size="small"
      :columns="columns"
      :data="data"
      bordered
      :single-line="false"
      max-height="calc(100vh - 280px)"
      :scroll-x="300"
      :row-key="(row) => row._key"
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
