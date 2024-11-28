import {
  TableRowsRound,
  TableChartOutlined,
  FolderRound,
  CastConnectedRound,
  InfoRound,
  TableViewRound,
  ViewListRound,
  FunctionsRound,
  VerifiedUserRound,
} from '@vicons/material'
import { TREE_RIGHT_CLICK_MENUS } from '@/utils/rightClick.js'
import { nanoid } from 'nanoid'
import { renderIcon } from '@/utils/icon.js'

const buildTableList = (count, icon = TableChartOutlined) => {
  const tList = []
  for (let i = 0; i < count; i++) {
    tList.push({
      key: nanoid(),
      label: nanoid(),
      prefix: renderIcon(icon),
    })
  }
  return tList
}

export const treeData = [
  {
    key: '1-mysql@1.2.3.09',
    label: 'mysql@1.2.3.09',
    prefix: renderIcon(ViewListRound, { size: 18 }),
    children: [
      {
        key: '2-1',
        label: '系统数据库',
        prefix: renderIcon(FolderRound),
        children: [
          {
            key: '3-1-1',
            label: 'information_schema',
            prefix: renderIcon(TableRowsRound),
            children: [
              {
                key: '4-1-1-1',
                label: '表',
                prefix: renderIcon(FolderRound),
                children: buildTableList(1),
              },
              {
                key: '4-1-1-2',
                label: '视图',
                prefix: renderIcon(FolderRound),
                children: buildTableList(10, TableViewRound),
              },
              {
                key: '4-1-1-3',
                label: '函数',
                prefix: renderIcon(FolderRound),
                children: buildTableList(10, FunctionsRound),
              },
            ],
          },
          {
            key: '3-1-2',
            label: 'performance_schema',
            prefix: renderIcon(TableRowsRound),
          },
        ],
      },
      {
        key: '2-2',
        label: '用户数据库',
        prefix: renderIcon(FolderRound),
      },
      {
        key: '2-3',
        label: '用户与权限',
        prefix: renderIcon(VerifiedUserRound),
      },
      { key: '2-4', label: '会话信息', prefix: renderIcon(CastConnectedRound) },
      { key: '2-5', label: '系统信息', prefix: renderIcon(InfoRound) },
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
