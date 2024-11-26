import { h } from 'vue'
import { NIcon } from 'naive-ui'
import { DatabaseFilled, FolderFilled, SafetyCertificateFilled } from '@vicons/antd'
import { TableRowsRound, TableChartOutlined } from '@vicons/material'
import { TREE_RIGHT_CLICK_MENUS } from '@/utils/rightClick.js'
import { nanoid } from 'nanoid'

const icon = (name, prop = null) =>
  h(NIcon, prop, {
    default: () => h(name),
  })
const tList = []
const buildTableList = (count) => {
  for (let i = 0; i < count; i++) {
    tList.push({
      key: crypto.randomUUID(),
      label: nanoid(18),
      prefix: () => icon(TableChartOutlined),
    })
  }
  return tList
}

export const treeData = [
  {
    key: '1-mysql@1.2.3.09',
    label: 'mysql@1.2.3.09',
    prefix: () => icon(DatabaseFilled),
    children: [
      {
        key: '2-1',
        label: '系统数据库',
        prefix: () =>
          h(NIcon, null, {
            default: () => h(FolderFilled),
          }),
        children: [
          {
            key: '3-1-1',
            label: 'information_schema',
            prefix: () =>
              h(NIcon, null, {
                default: () => h(TableRowsRound),
              }),
            children: [
              {
                key: '4-1-1-1',
                label: '表',
                prefix: () =>
                  h(NIcon, null, {
                    default: () => h(FolderFilled),
                  }),
                children: buildTableList(10000),
              },
              {
                key: '4-1-1-2',
                label: '视图',
                prefix: () =>
                  h(NIcon, null, {
                    default: () => h(FolderFilled),
                  }),
                children: buildTableList(10000),
              },
            ],
          },
          {
            key: '3-1-2',
            label: 'performance_schema',
            prefix: () =>
              h(NIcon, null, {
                default: () => h(TableRowsRound),
              }),
          },
        ],
      },
      {
        key: '2-2',
        label: '用户数据库',
        prefix: () =>
          h(NIcon, null, {
            default: () => h(FolderFilled),
          }),
      },
      {
        key: '2-3',
        label: '用户与权限',
        prefix: () =>
          h(NIcon, null, {
            default: () => h(SafetyCertificateFilled),
          }),
      },
      { key: '2-4', label: '会话信息' },
      { key: '2-5', label: '系统信息' },
    ],
  },
  {
    key: '1-gbase@localhost',
    label: 'gbase@localhost',
    children: [
      { key: '2-1-gbase@localhost', label: '系统数据库' },
      { key: '2-2-gbase@localhost', label: '用户数据库' },
      { key: '2-3-gbase@localhost', label: '用户与权限' },
      { key: '2-4-gbase@localhost', label: '会话信息' },
      { key: '2-5-gbase@localhost', label: '系统信息' },
    ],
  },
]

export const treeRightClickMappings = {
  DATASOURCE: [
    TREE_RIGHT_CLICK_MENUS.DATASOURCE_CREATE,
    TREE_RIGHT_CLICK_MENUS.DATASOURCE_EDIT,
    TREE_RIGHT_CLICK_MENUS.DATASOURCE_RENAME,
    TREE_RIGHT_CLICK_MENUS.DIVIDER,
    TREE_RIGHT_CLICK_MENUS.DATASOURCE_REFRESH,
  ],
}
