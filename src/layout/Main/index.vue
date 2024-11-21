<script setup>
import { ref } from 'vue'
import SQLConsole from '@/views/sql-console/index.vue'
import DataOperation from '@/components/DataOperation/index.vue'

const key = ref('1')
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

      <SQLConsole />
    </n-tab-pane>

    <n-tab-pane tab="t_address[gbase@localhost]" key="3" name="3">
      <DataOperation />
    </n-tab-pane>
  </n-tabs>
</template>
