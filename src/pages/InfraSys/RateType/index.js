import React from 'react'
import { connect } from 'dva'
import {
  Card,
  Table,
  Form,
  Button,
  Popconfirm,
  Divider,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import Create from './Create'

import styles from '../table.less'

const type = 'rateType'
const id = 'rateTypeId'
const header = '比率类型'

@connect(({ type: sysType, loading }) => ({
  list: sysType.list[type],
  loading: loading.models[type],
}))
@Form.create()
class Type extends React.Component {

  state = {
    isCreateShow: false,
    isUpdateShow: false,
    info: {},
  }

  columns = [
    {
      title: '名称',
      dataIndex: `${type}Name`,
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '最后修改时间',
      dataIndex: 'lastUpdatedStamp',
    },
    {
      title: '创建时间',
      dataIndex: 'createdStamp',
    },
    {
      title: '版本',
      dataIndex: 'version',
    },
    {
      title: '操作',
      render: (text, record) => (
        <React.Fragment>
          <Popconfirm title="是否要删除此行？" onConfirm={() => this.handleRemove(record)}>
            <a>删除</a>
          </Popconfirm>
          <Divider type="vertical" />
          <a onClick={() => this.handleUpdate(record)}>修改</a>
        </React.Fragment>
      ),
    },
  ]

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'type/find',
      payload: {
        type,
      }
    });
  }

  handleCreateModal = (visible) => {
    this.setState({isCreateShow: visible})
  }

  handleCreateForm = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'type/add',
      payload: {
        type,
        id,
        payload: {
          ...values,
          id,
        },
      },
      callback: () => this.handleCreateModal(false),
    });
  }

  handleRemove = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'type/remove',
      payload: {
        type,
        key: record[id]
      }
    });
  }

  handleUpdate = (record) => {
    this.setState({isUpdateShow: true, info: record})
  }

  handleUpdateModal = (visible) => {
    this.setState({isUpdateShow: visible})
  }

  handleUpdateForm = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'type/edit',
      payload: {
        type,
        key: record[id],
        payload: record,
      },
      callback: () => this.handleUpdateModal(false),
    });
  }

  render() {
    const {
      loading,
      list,
    } = this.props
    const {
      isCreateShow,
      isUpdateShow,
      info,
    } = this.state

    return (
      <PageHeaderWrapper title={header}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleCreateModal(true)}>
                新建
              </Button>
            </div>
            <Table
              loading={loading}
              dataSource={list}
              pagination={false}
              columns={this.columns}
              rowKey={record => record[id]}
            />
          </div>
        </Card>
        <Create 
          title="新建"
          visible={isCreateShow} 
          hideModal={() => this.handleCreateModal(false)} 
          handleFormSubmit={this.handleCreateForm}
          info={{}}
          type={type}
        />
        <Create 
          title="修改"
          visible={isUpdateShow} 
          hideModal={() => this.handleUpdateModal(false)} 
          handleFormSubmit={this.handleUpdateForm}
          info={info}
          type={type}
        />
      </PageHeaderWrapper>
    )
  }
}

export default Type