<script setup>
import { ref } from 'vue'
import sql from '@/views/sql.vue'

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
    <n-tab-pane tab="SQL 编辑器" key="1" name="1">
      <sql />
    </n-tab-pane>
    <n-tab-pane tab="创建表" key="2" name="2"> 创建表 </n-tab-pane>
    <n-tab-pane tab="t_user" key="3" name="3">
      表数据查看与操作
      <n-data-table size="small" :columns="columns" :data="data" :bordered="false" />
    </n-tab-pane>
  </n-tabs>
</template>
