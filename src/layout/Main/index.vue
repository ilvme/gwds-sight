<script setup>
import { ref } from 'vue'
import sql from '@/views/sql.vue'
import DataOperation from '@/components/DataOperation/index.vue'

const key = ref('1')

const data = ref([])
const columns = ref([
  { title: 'Name', key: 'name' },
  { title: 'Age', key: 'age' },
  { title: 'Address', key: 'address' },
])
</script>
<template>
  <n-tabs size="small" v-model:value="key" type="card" default-value="1" closable>
    <n-tab-pane key="1" name="1">
      <template #tab>
        <n-popover trigger="hover" :delay="500">
          <template #trigger>
            <span>SQL 编辑器[mysql@1.2.3.09]</span>
          </template>
          <p>数据源：mysql@1.2.3.09</p>
          <p>类型：MySQL</p>
          <p>URL：jdbc:mysql//1.2.3.09:3306</p>
        </n-popover>
      </template>

      <sql />
    </n-tab-pane>

    <n-tab-pane tab="创建表[mysql@1.2.3.09]" key="2" name="2"> 创建表 </n-tab-pane>

    <n-tab-pane tab="t_address[gbase@localhost]" key="3" name="3">
      <DataOperation />
    </n-tab-pane>

    <n-tab-pane tab="t_user[gbase@localhost]" key="4" name="4">
      表数据查看与操作
      <n-data-table size="small" :columns="columns" :data="data" :bordered="false" />
    </n-tab-pane>
  </n-tabs>
</template>
