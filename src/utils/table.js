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
  WindowRound,
  GppGoodRound,
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
    key: nanoid(),
    label: 'mysql@1.2.3.09',
    prefix: renderIcon(ViewListRound, { size: 18 }),
    children: [
      {
        key: nanoid(),
        label: '系统数据库',
        prefix: renderIcon(FolderRound),
        children: [
          {
            key: nanoid(),
            label: 'information_schema',
            prefix: renderIcon(TableRowsRound),
            children: [
              {
                key: nanoid(),
                label: '表',
                prefix: renderIcon(FolderRound),
                children: buildTableList(1),
              },
              {
                key: nanoid(),
                label: '视图',
                prefix: renderIcon(FolderRound),
                children: buildTableList(10, WindowRound),
              },
              {
                key: nanoid(),
                label: '函数',
                prefix: renderIcon(FolderRound),
                children: buildTableList(10, FunctionsRound),
              },
            ],
          },
          {
            key: nanoid(),
            label: 'performance_schema',
            prefix: renderIcon(TableRowsRound),
          },
        ],
      },
      {
        key: nanoid(),
        label: '用户数据库',
        prefix: renderIcon(FolderRound),
      },
      {
        key: nanoid(),
        label: '用户与权限',
        prefix: renderIcon(GppGoodRound),
      },
      { key: nanoid(), label: '会话信息', prefix: renderIcon(CastConnectedRound) },
      { key: nanoid(), label: '系统信息', prefix: renderIcon(InfoRound) },
    ],
  },
  {
    key: nanoid(),
    label: 'gbase@111.222.222.192',
    prefix: renderIcon(ViewListRound, { size: 18 }),
    children: [
      {
        key: nanoid(),
        label: '系统数据库',
        prefix: renderIcon(FolderRound),
        children: [
          {
            key: nanoid(),
            label: 'information_schema',
            prefix: renderIcon(TableRowsRound),
            children: [
              {
                key: nanoid(),
                label: '表',
                prefix: renderIcon(FolderRound),
                children: buildTableList(1),
              },
              {
                key: nanoid(),
                label: '视图',
                prefix: renderIcon(FolderRound),
                children: buildTableList(10, WindowRound),
              },
              {
                key: nanoid(),
                label: '函数',
                prefix: renderIcon(FolderRound),
                children: buildTableList(10, FunctionsRound),
              },
            ],
          },
          {
            key: nanoid(),
            label: 'performance_schema',
            prefix: renderIcon(TableRowsRound),
          },
        ],
      },
      {
        key: nanoid(),
        label: '用户数据库',
        prefix: renderIcon(FolderRound),
      },
      {
        key: nanoid(),
        label: '用户与权限',
        prefix: renderIcon(VerifiedUserRound),
      },
      { key: nanoid(), label: '会话信息', prefix: renderIcon(CastConnectedRound) },
      { key: nanoid(), label: '系统信息', prefix: renderIcon(InfoRound) },
    ],
  },
  {
    key: nanoid(),
    label: 'sqlite@212.212.123.109',
    prefix: renderIcon(ViewListRound, { size: 18 }),
    children: [
      {
        key: nanoid(),
        label: '系统数据库',
        prefix: renderIcon(FolderRound),
        children: [
          {
            key: nanoid(),
            label: 'information_schema',
            prefix: renderIcon(TableRowsRound),
            children: [
              {
                key: nanoid(),
                label: '表',
                prefix: renderIcon(FolderRound),
                children: buildTableList(1),
              },
              {
                key: nanoid(),
                label: '视图',
                prefix: renderIcon(FolderRound),
                children: buildTableList(10, TableViewRound),
              },
              {
                key: nanoid(),
                label: '函数',
                prefix: renderIcon(FolderRound),
                children: buildTableList(10, FunctionsRound),
              },
            ],
          },
          {
            key: nanoid(),
            label: 'performance_schema',
            prefix: renderIcon(TableRowsRound),
          },
        ],
      },
      {
        key: nanoid(),
        label: '用户数据库',
        prefix: renderIcon(FolderRound),
      },
      {
        key: nanoid(),
        label: '用户与权限',
        prefix: renderIcon(VerifiedUserRound),
      },
      { key: nanoid(), label: '会话信息', prefix: renderIcon(CastConnectedRound) },
      { key: nanoid(), label: '系统信息', prefix: renderIcon(InfoRound) },
    ],
  },
  {
    key: nanoid(),
    label: 'mysql@12.23.34.109',
    prefix: renderIcon(ViewListRound, { size: 18 }),
    children: [
      {
        key: nanoid(),
        label: '系统数据库',
        prefix: renderIcon(FolderRound),
        children: [
          {
            key: nanoid(),
            label: 'information_schema',
            prefix: renderIcon(TableRowsRound),
            children: [
              {
                key: nanoid(),
                label: '表',
                prefix: renderIcon(FolderRound),
                children: buildTableList(1),
              },
              {
                key: nanoid(),
                label: '视图',
                prefix: renderIcon(FolderRound),
                children: buildTableList(10, TableViewRound),
              },
              {
                key: nanoid(),
                label: '函数',
                prefix: renderIcon(FolderRound),
                children: buildTableList(10, FunctionsRound),
              },
            ],
          },
          {
            key: nanoid(),
            label: 'performance_schema',
            prefix: renderIcon(TableRowsRound),
          },
        ],
      },
      {
        key: nanoid(),
        label: '用户数据库',
        prefix: renderIcon(FolderRound),
      },
      {
        key: nanoid(),
        label: '用户与权限',
        prefix: renderIcon(VerifiedUserRound),
      },
      { key: nanoid(), label: '会话信息', prefix: renderIcon(CastConnectedRound) },
      { key: nanoid(), label: '系统信息', prefix: renderIcon(InfoRound) },
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
