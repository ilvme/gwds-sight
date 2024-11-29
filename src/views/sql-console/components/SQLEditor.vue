<script setup>
import { onMounted, ref, toRaw, useId } from 'vue'
import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import { language } from 'monaco-editor/esm/vs/basic-languages/sql/sql'
import { format } from 'sql-formatter'
import { PlayArrowRound } from '@vicons/material'
import { useResizeObserver } from '@vueuse/core'

defineOptions({ name: 'SQLEditor' })

self.MonacoEnvironment = {
  getWorker() {
    return new EditorWorker()
  },
}

const keyId = useId()

// 注册SQL关键字提示
// 这个是自定义的表字段数据
const fieldsArr = [
  // type 区分关键字和字段
  { type: 'Field', value: 'name' },
  { type: 'Field', value: 'age' },
  { type: 'Field', value: 'sex' },
]
const editorRef = ref(null)
const editor = ref(null)
onMounted(async () => {
  // 注册自定义关键字提示
  monaco.languages.registerCompletionItemProvider('sql', {
    provideCompletionItems: (model, position) => {
      let suggestions = []
      // 再把内置的关键字数据处理下
      const temp = language.keywords.map((item) => {
        return { type: 'Keyword', value: item }
      })
      // 把关键字和表字段数据合到一起，这样就不用输入快捷键才会显示表字段了
      const result = [...fieldsArr, ...temp]
      result.map((item) => {
        suggestions.push({
          label: item.value,
          kind: monaco.languages.CompletionItemKind[item.type],
          insertText: item.value + ' ',
          detail: item.type === 'Keyword' ? '内置关键字' : '表字段',
        })
      })
      return { suggestions }
    },
  })

  // 编辑器初始化
  editor.value = await monaco.editor.create(document.getElementById(`editor_container_` + keyId), {
    automaticLayout: true,
    minimap: { enabled: false }, // 关闭小地图
    tabSize: 2,
    fontSize: 14,
    cursorBlinking: 'smooth',
    lineHeight: 1.6,
    mouseWheelZoom: true,
    language: 'sql',
    value: `-- 查询 user 表数据 \nSELECT * FROM user WHERE id = 1 and username like '%kangjia%' ORDER BY age DESC;`,
    contextmenu: true,
    scrollbar: {
      useShadows: false,
      verticalHasArrows: false,
      horizontalHasArrows: false,
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8,
      arrowSize: 0,
    },
  })

  // 添加右键菜单
  editor.value.addAction({
    id: 'sql-formatter',
    label: 'SQL 格式化',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyL],
    contextMenuGroupId: 'navigation',
    contextMenuOrder: 1.5,
    precondition: null,
    run() {
      formatSQL()
    },
  })
  editor.value.addAction({
    id: 'sql-execute',
    label: '执行选中',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.F8],
    contextMenuGroupId: 'navigation1',
    contextMenuOrder: 1.5,
    precondition: null,
    run() {
      formatSQL()
    },
  })

  useResizeObserver(editorRef.value, () => {
    toRaw(editor.value).layout()
  })
})

// SQL 格式化
function formatSQL() {
  let oldContent = toRaw(editor.value).getValue()
  toRaw(editor.value).setValue(format(oldContent))
}
</script>

<template>
  <main style="margin-left: 10px; margin-right: 10px; padding-bottom: 40px; height: 100%">
    <n-flex style="margin-bottom: 5px">
      <n-button size="tiny" type="primary">
        执行 F8
        <n-icon size="14" style="margin-left: 8px"> <PlayArrowRound /> </n-icon>
      </n-button>
      <n-button size="tiny" secondary type="primary">执行所有 F9</n-button>
      <n-button size="tiny" secondary type="primary" @click="formatSQL"> 格式化 </n-button>
      <n-button size="tiny" secondary> 保存为 SQL 模板 </n-button>
      <n-button size="tiny" secondary type="warning"> 导出为 SQL 文件 </n-button>
      <n-button size="tiny" secondary> 清空所有 </n-button>
    </n-flex>

    <!-- 核心编辑器 -->
    <div
      ref="editorRef"
      :id="`editor_container_` + keyId"
      style="border: 1px #eae9e9 solid; height: 100%"
    />
  </main>
</template>

<style scoped></style>
