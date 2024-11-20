<script setup>
import { RefreshOutlined, PlusOutlined, MinusOutlined } from '@vicons/material'
import {
  ArrowCircleUpFilled,
  KeyboardDoubleArrowLeftFilled,
  KeyboardDoubleArrowRightOutlined,
  KeyboardArrowLeftFilled,
  KeyboardArrowRightRound,
  KeyboardArrowDownRound,
} from '@vicons/material'
import { NIcon } from 'naive-ui'
import { computed, ref } from 'vue'
const options = [
  { label: 10, key: 10 },
  { label: 20, key: 20 },
  { label: 50, key: 50 },
  { label: 100, key: 100 },
  { label: 250, key: 250 },
  { label: 500, key: 500 },
]
const pageSize = ref(10)
function handleChangePageSize(key) {
  pageSize.value = key
}

const searchCondition = ref('')
const searchTips = ref(['abc', 'bbb', 'bcd'])

const tipOption = computed(() => {
  return searchTips.value.filter((item) => item.includes(searchCondition.value))
})

const data = ref([])
const columns = ref([
  { title: 'Name', key: 'name' },
  { title: 'Age', key: 'age' },
  { title: 'Address', key: 'address' },
])
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
        <n-popover trigger="hover" :delay="500" placement="bottom">
          <template #trigger>
            <div>
              <n-dropdown
                placement="bottom"
                trigger="click"
                size="small"
                :options="options"
                @select="handleChangePageSize"
              >
                <n-flex size="small" align="center" style="cursor: pointer">
                  <span>{{ pageSize + '行' }}</span>
                  <n-icon><KeyboardArrowDownRound /></n-icon>
                </n-flex>
              </n-dropdown>
            </div>
          </template>
          更改每页行数
        </n-popover>
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
    <n-flex style="margin-top: 5px">
      <n-flex size="small">
        WHERE
        <n-auto-complete
          style="width: 300px"
          size="small"
          v-model:value="searchCondition"
          :input-props="{
            autocomplete: 'disabled',
          }"
          :options="tipOption"
          clearable
        />
      </n-flex>
      <n-flex size="small">
        ORDER BY
        <n-auto-complete
          style="width: 300px"
          size="small"
          v-model:value="searchCondition"
          :input-props="{
            autocomplete: 'disabled',
          }"
          :options="tipOption"
          clearable
        />
      </n-flex>
    </n-flex>

    <!-- 数据区域 -->
    <n-data-table
      v-if="data.length > 0"
      size="small"
      :columns="columns"
      :data="data"
      :bordered="false"
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
