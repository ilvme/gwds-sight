<script setup>
import { h, onMounted, ref, toRaw, useId } from 'vue'
import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import { language } from 'monaco-editor/esm/vs/basic-languages/sql/sql'
import { format } from 'sql-formatter'
import {
  AutoFixHighRound,
  CheckRound,
  CloudUploadRound,
  DeleteSweepRound,
  MoreHorizRound,
  PlayArrowRound,
  RefreshRound,
  SaveRound,
  ShareFilled,
  TableRowsRound,
  ViewListRound,
} from '@vicons/material'
import { useResizeObserver } from '@vueuse/core'
import { NIcon } from 'naive-ui'
import { renderIcon } from '@/utils/icon.js'
import { fetchDatasourceList } from '@/api/datasource.js'
import TreeUtil from '@/utils/menus/support.js'
import { fetchDatabaseList } from '@/api/database.js'

defineOptions({ name: 'SQLEditor' })

const props = defineProps({
  sourceNode: Object,
})

self.MonacoEnvironment = {
  getWorker() {
    return new EditorWorker()
  },
}

const keyId = useId()

// 注册 SQL 关键字提示，这个是自定义的表字段数据
const fieldsArr = [
  // type 区分关键字和字段
  { type: 'Field', value: 'name' },
  { type: 'Field', value: 'age' },
  { type: 'Field', value: 'sex' },
]

const editorRef = ref(null)
const editor = ref(null)

onMounted(async () => {
  // TODO 数据源、数据库初始化需要分情况
  // 1.无数据源、无数据库时
  // 2.有数据源、无数据库
  // 3.有数据源、有数据库
  // 获取所有数据源
  const res = await fetchDatasourceList()
  res.data.map((item) => {
    datasourceOptions.value.push({ label: item.name, value: item.id })
  })
  currentDatasource.value =
    parseInt(TreeUtil.parseDatasourceId(props.sourceNode?.key)) || res.data[0].id
  // 获取当前数据源下的所有数据库
  if (currentDatasource.value) {
    const res = await fetchDatabaseList(currentDatasource.value)
    currentDatabase.value = res.data[0]
    databaseOptions.value = res.data.map((item) => {
      return { label: item, value: item }
    })
  }

  // 注册自定义关键字提示
  monaco.languages.registerCompletionItemProvider('sql', {
    provideCompletionItems: () => {
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
  editor.value = monaco.editor.create(document.getElementById(`editor_container_` + keyId), {
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
    theme: 'vs-dark',
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

// 当前数据源
const currentDatasource = ref(null)
const datasourceOptions = ref([])
function renderDatasourceLabel(option) {
  return h(
    'div',
    {
      style: { display: 'flex', alignItems: 'center', gap: '5px' },
    },
    [renderIcon(ViewListRound)(), option.label],
  )
}

// 当前数据库
const currentDatabase = ref(null)
const databaseOptions = ref([
  { label: 'gbase', value: 'gbase' },
  { label: 'db_dms', value: 'db_dms' },
  { label: 'gdom', value: 'gdom' },
])
function renderDatabaseLabel(option) {
  return h(
    'div',
    {
      style: { display: 'flex', alignItems: 'center', gap: '5px' },
    },
    [renderIcon(TableRowsRound)(), option.label],
  )
}

// 操作栏更多选项
const editorOtherOptions = [
  { label: '保存到我的 SQL', key: 'profile', icon: renderIcon(SaveRound) },
  { type: 'divider', key: useId() },
  { label: '导出为 SQL 脚本', key: 'editProfile', icon: renderIcon(ShareFilled) },
  { label: '导入 SQL 脚本', key: 'logout', icon: renderIcon(CloudUploadRound) },
]

// 自动提交
const autoCommit = ref('automatic')
const commitOptions = [
  { label: 'Tx: 自动', value: 'automatic' },
  { label: 'Tx: 手动', value: 'manual' },
]

// SQL 格式化
function formatSQL() {
  let oldContent = toRaw(editor.value).getValue()
  toRaw(editor.value).setValue(format(oldContent))
}
</script>

<template>
  <main style="height: 100%; display: flex; flex-direction: column">
    <!-- 功能操作区域 -->
    <n-flex style="margin-bottom: 3px; padding-right: 6px" justify="space-between" align="center">
      <n-flex>
        <n-select
          style="width: 100px"
          v-model:value="autoCommit"
          size="tiny"
          :options="commitOptions"
        />
        <div v-if="autoCommit === 'manual'">
          <n-tooltip trigger="hover" :delay="500">
            <template #trigger>
              <n-button size="tiny" type="primary" tertiary>
                <n-icon size="18" color="#18a058"> <CheckRound /> </n-icon>
              </n-button>
            </template>
            提交
          </n-tooltip>
          <n-tooltip trigger="hover" :delay="500">
            <template #trigger>
              <n-button size="tiny" type="primary" tertiary>
                <n-icon size="18" color="#d03050"> <RefreshRound /> </n-icon>
              </n-button>
            </template>
            回滚
          </n-tooltip>
        </div>

        <n-divider vertical />

        <n-tooltip trigger="hover" :delay="500">
          <template #trigger>
            <n-button size="tiny" type="primary">
              <n-icon size="16"> <PlayArrowRound /> </n-icon>
            </n-button>
          </template>
          执行 SQL
        </n-tooltip>

        <n-tooltip trigger="hover" :delay="500">
          <template #trigger>
            <n-button size="tiny" type="success" secondary @click="formatSQL">
              <n-icon size="16"> <AutoFixHighRound /> </n-icon>
            </n-button>
          </template>
          格式化
        </n-tooltip>

        <n-tooltip trigger="hover" :delay="200">
          <template #trigger>
            <n-button size="tiny" type="warning" secondary @click="formatSQL">
              <n-icon size="16"> <DeleteSweepRound /> </n-icon>
            </n-button>
          </template>
          清空
        </n-tooltip>

        <n-dropdown :options="editorOtherOptions" size="small">
          <n-button size="tiny" secondary>
            <n-icon size="18"> <MoreHorizRound /> </n-icon>
          </n-button>
        </n-dropdown>
      </n-flex>

      <!-- 数据源、数据库选择框 -->
      <n-flex>
        <n-select
          style="width: 200px"
          placeholder="选择数据源"
          v-model:value="currentDatasource"
          size="tiny"
          filterable
          :render-label="renderDatasourceLabel"
          :options="datasourceOptions"
        />
        <n-select
          style="width: 180px"
          placeholder="选择数据库"
          v-model:value="currentDatabase"
          size="tiny"
          filterable
          :render-label="renderDatabaseLabel"
          :options="databaseOptions"
        />
      </n-flex>
    </n-flex>

    <!-- 核心编辑器区域 -->
    <div ref="editorRef" :id="`editor_container_` + keyId" style="height: 100%; padding: 5px 0" />
  </main>
</template>

<style scoped>
:deep(.n-divider.n-divider--vertical) {
  width: 2px;
  height: 20px;
  margin: 0 5px;
}
</style>
