import React from 'react'
import {
  Card,
  Table,
 } from 'antd'
import { FormattedMessage } from 'umi/locale'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import StandardFormRow from '@/components/StandardFormRow'
import TagSelect from '@/components/TagSelect'
import StandardTable from '@/components/StandardTable'

import styles from './PendingList.less'

const dataSource = [
  {
    workNo: '340987959',
    pactNo: '1870877',
    orderNo: '59904321',
    orderAmt: '10699',
    company: '北京易信有限公司',
    contact: '陈晓鲁',
    phone: '1870****887',
    record: '',
    remark: '',
    works: [
      {
        planNo: '1',
        workPlan: '新设立',
        charge: '销售：张恒',
      },
    ],
  },
  {
    workNo: '340987959',
    pactNo: '1870877',
    orderNo: '59904321',
    orderAmt: '10699',
    company: '北京易信有限公司',
    contact: '陈晓鲁',
    phone: '1870****887',
    record: '',
    remark: '',
    works: [
      {
        planNo: '',
        workPlan: '',
        charge: '',
      },
    ],
  },
  {
    workNo: '340987959',
    pactNo: '1870877',
    orderNo: '59904321',
    orderAmt: '10699',
    company: '北京易信有限公司',
    contact: '陈晓鲁',
    phone: '1870****887',
    record: '',
    remark: '',
    works: [
      {
        planNo: '',
        workPlan: '',
        charge: '',
      },
    ],
  },
  {
    workNo: '340987959',
    pactNo: '1870877',
    orderNo: '59904321',
    orderAmt: '10699',
    company: '北京易信有限公司',
    contact: '陈晓鲁',
    phone: '1870****887',
    record: '',
    remark: '',
    works: [
      {
        planNo: '',
        workPlan: '',
        charge: '',
      },
    ],
  },
]

class PendingList extends React.Component {

  state = {
    selectedRows: []
  }

  columns = [
    { title: '工作计划编号', dataIndex: 'workNo', key: 'workNo' },
    { title: '合同编号', dataIndex: 'pactNo', key: 'pactNo' },
    { title: '订单编号', dataIndex: 'orderNo', key: 'orderNo' },
    { title: '订单金额(元)', dataIndex: 'orderAmt', key: 'orderAmt' },
    { title: '公司名称', dataIndex: 'company', key: 'company' },
    { title: '联系人', dataIndex: 'contact', key: 'contact' },
    { title: '联系方式', dataIndex: 'phone', key: 'phone' },
  ]

  expandedRowRender = (record) => {
    const columns = [
      { title: '工作计划', dataIndex: 'workPlan', key: 'workPlan' },
      { title: '负责人', dataIndex: 'charge', key: 'charge' },
      { title: '沟通记录', dataIndex: 'name', key: 'state' },
      { title: '备注', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    ]
    return (
      <Table
        columns={columns}
        dataSource={record.works}
        pagination={false}
      />
    )
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    })
  }

  render() {
    const { selectedRows } = this.state
    const actionsTextMap = {
      expandText: <FormattedMessage id="component.tagSelect.expand" defaultMessage="Expand" />,
      collapseText: (
        <FormattedMessage id="component.tagSelect.collapse" defaultMessage="Collapse" />
      ),
      selectAllText: <FormattedMessage id="component.tagSelect.all" defaultMessage="All" />,
    };
    return (
      <PageHeaderWrapper title="待分配">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <StandardFormRow title="分配状态">
                <TagSelect actionsText={actionsTextMap}>
                  <TagSelect.Option value="1">待分配(5)</TagSelect.Option>
                  <TagSelect.Option value="2">已分配-未改派</TagSelect.Option>
                  <TagSelect.Option value="3">已分配-已改派</TagSelect.Option>
                </TagSelect>
              </StandardFormRow>
              <StandardFormRow title="计划类型">
                <TagSelect actionsText={actionsTextMap}>
                  <TagSelect.Option value="1">未回款(7)</TagSelect.Option>
                  <TagSelect.Option value="2">无法进行(5)</TagSelect.Option>
                </TagSelect>
              </StandardFormRow>           
            </div>
            <StandardTable 
              selectedRows={selectedRows}
              onSelectRow={this.handleSelectRows}
              columns={this.columns}
              expandedRowRender={this.expandedRowRender}
              dataSource={dataSource}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default PendingList;