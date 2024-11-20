import { h } from 'vue'
import { NIcon } from 'naive-ui'
import { DatabaseFilled, FolderFilled, SafetyCertificateFilled } from '@vicons/antd'
import { TableRowsRound, TableChartOutlined } from '@vicons/material'
import { randC } from '@/utils/common.js'

const icon = (name) =>
  h(NIcon, null, {
    default: () => h(name),
  })

export const treeData = [
  {
    key: '1',
    label: 'mysql@1.2.3.09',
    prefix: () => icon(DatabaseFilled),
    children: [
      {
        key: '1-1',
        label: '系统数据库',
        prefix: () =>
          h(NIcon, null, {
            default: () => h(FolderFilled),
          }),
        children: [
          {
            key: '1-1-1',
            label: 'information_schema',
            prefix: () =>
              h(NIcon, null, {
                default: () => h(TableRowsRound),
              }),
            children: [
              {
                key: '1-1-1-1',
                label: '表',
                prefix: () =>
                  h(NIcon, null, {
                    default: () => h(FolderFilled),
                  }),
                children: [
                  { key: randC(), label: 't_user', prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: 't_system', prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                  { key: randC(), label: randC(), prefix: () => icon(TableChartOutlined) },
                ],
              },
              {
                key: '1-1-1-2',
                label: '视图',
                prefix: () =>
                  h(NIcon, null, {
                    default: () => h(FolderFilled),
                  }),
              },
            ],
          },
          {
            key: '1-1-2',
            label: 'performance_schema',
            prefix: () =>
              h(NIcon, null, {
                default: () => h(TableRowsRound),
              }),
          },
        ],
      },
      {
        key: '1-2',
        label: '用户数据库',
        prefix: () =>
          h(NIcon, null, {
            default: () => h(FolderFilled),
          }),
      },
      {
        key: '1-3',
        label: '用户与权限',
        prefix: () =>
          h(NIcon, null, {
            default: () => h(SafetyCertificateFilled),
          }),
      },
      { key: '1-4', label: '会话信息' },
      { key: '1-5', label: '系统信息' },
    ],
  },
  {
    key: '2',
    label: 'gbase@localhost',
    children: [
      { key: '2-1', label: '系统数据库' },
      { key: '2-2', label: '用户数据库' },
      { key: '2-3', label: '用户与权限' },
      { key: '2-4', label: '会话信息' },
      { key: '2-5', label: '系统信息' },
    ],
  },
]
