<script setup>
import { ref, onMounted, toRaw } from 'vue'
import * as monaco from 'monaco-editor'
import { format } from 'sql-formatter'
import { CaretRightOutlined } from '@vicons/antd'

defineOptions({ name: 'SQLEditor' })

function formatSQL() {
  let oldContent = toRaw(editor.value).getValue()
  toRaw(editor.value).setValue(format(oldContent))
}
const editor = ref(null)
onMounted(async () => {
  editor.value = await monaco.editor.create(document.getElementById('editor_container'), {
    // 此处的配置项几乎与 VSCode 中的一致
    automaticLayout: true,
    // scrollBeyondLastLine: true,
    tabSize: 2,
    fontSize: 14,
    cursorBlinking: 'smooth',
    lineHeight: 1.6,
    mouseWheelZoom: true,
    language: 'sql',
    value: `-- 查询 user 表数据 \nSELECT * FROM user WHERE id = 1 and username like '%kangjia%' ORDER BY age DESC;`,
    contextmenu: true,
  })

  await editor.value.addAction({
    id: 'sql-formatter',
    label: 'SQL 格式化',
    contextMenuGroupId: 'navigation',
    contextMenuOrder: 1.5,
    precondition: 'editorLangId === sql',
    run() {
      formatSQL()
    },
  })
})
</script>

<template>
  <main style="margin-left: 10px; margin-right: 10px">
    <n-flex style="margin-bottom: 5px">
      <n-button size="tiny" type="primary">
        执行 F8
        <n-icon size="14" style="margin-left: 8px"> <CaretRightOutlined /> </n-icon>
      </n-button>
      <n-button size="tiny" secondary type="primary">执行所有 F9</n-button>
      <n-button size="tiny" secondary type="primary" @click="formatSQL"> 格式化 </n-button>
      <n-button size="tiny" secondary> 保存为 SQL 模板 </n-button>
      <n-button size="tiny" secondary type="warning"> 导出为 SQL 文件 </n-button>
      <n-button size="tiny" secondary> 清空所有 </n-button>
    </n-flex>
    <div id="editor_container" style="height: 300px; border: 1px #eae9e9 solid"></div>
  </main>
</template>

<style scoped></style>
