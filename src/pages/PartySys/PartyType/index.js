import React from 'react'
import { connect } from 'dva'
import {
  Card,
  Table,
  Button,
  Popconfirm,
  Divider,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import Create from './Create'
import Order from './Order'

import styles from '../table.less'

@connect(({ partyType, loading }) => ({
  list: partyType.list,
  info: partyType.info,
  loading: loading.models.partyType,
}))
class PartyType extends React.Component {

  state = {
    isCreateShow: false,
    isOrderShow: false,
    isUpdateShow: false,
  }

  columns = [
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '是否有表',
      dataIndex: 'hasTable',
      render(val) {
        return val === '0'? '无': '有';
      },
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
      type: 'partyType/tree',
      payload: {
        type: 'partyType',
        id: 'partyTypeId',
        pId: 'parentTypeId',
      }
    });
  }

  handleCreateModal = (visible) => {
    this.setState({isCreateShow: visible})
  }

  handleCreateForm = (values) => {
    const { list, dispatch } = this.props;
    dispatch({
      type: 'partyType/add',
      payload: {
        type: 'partyType',
        id: 'partyTypeId',
        pId: 'parentTypeId',
        isTree: true,
        payload: {
          ...values,
          key: (list.length + 100).toString(),
          partyTypeId: (list.length + 100).toString(),
          parentTypeId: "",
        },
      },
      callback: () =>  this.handleCreateModal(false),
    });
  }

  handleOrderModal = (visible) => {
    this.setState({isOrderShow: visible})
  }

  handleOrderForm = (values) => {
    console.log(values)
  }

  handleUpdateModal = (visible) => {
    this.setState({isUpdateShow: visible})
  }

  handleUpdateForm = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'partyType/edit',
      payload: {
        type: 'partyType',
        id: 'partyTypeId',
        pId: 'parentTypeId',
        isTree: true,
        key: values.partyTypeId,
        payload: values,
      },
      callback: () =>  this.handleUpdateModal(false),
    });
  }

  handleUpdate = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'partyType/findOne',
      payload: {
        type: 'partyType',
        key: record.partyTypeId
      }
    });
    this.handleUpdateModal(true);
  }

  handleRemove = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'partyType/remove',
      payload: {
        type: 'partyType',
        key: record.partyTypeId,
        id: 'partyTypeId',
        pId: 'parentTypeId',
        isTree: true,
      }
    });
  }

  render() {
    const {
      loading,
      list,
      info,
    } = this.props
    const { 
      isCreateShow, 
      isUpdateShow,
      isOrderShow,
    } = this.state
    
    return (
      <PageHeaderWrapper title="当事人类型">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleCreateModal(true)}>
                新建
              </Button>
              <Button icon="ordered-list" type="primary" onClick={() => this.handleOrderModal(true)}>
                排序
              </Button>
            </div>
            <Table
              loading={loading}
              dataSource={list}
              pagination={false}
              columns={this.columns}
              rowKey={record => record.partyTypeId}
            />
          </div>
        </Card>
        <Create 
          visible={isCreateShow} 
          hideModal={() => this.handleCreateModal(false)} 
          handleFormSubmit={this.handleCreateForm}
          info={{}}
        />
        <Create 
          visible={isUpdateShow} 
          hideModal={() => this.handleUpdateModal(false)} 
          handleFormSubmit={this.handleUpdateForm}
          info={info}
        />
        <Order 
          visible={isOrderShow} 
          hideModal={() => this.handleOrderModal(false)} 
          handleFormSubmit={this.handleOrderForm}
          dataSource={list}
        />
      </PageHeaderWrapper>
    )
  }
}

export default PartyType