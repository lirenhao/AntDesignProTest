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

@connect(({ productType, loading }) => ({
  list: productType.list,
  info: productType.info,
  loading: loading.models.productType,
}))
class ProductType extends React.Component {

  state = {
    isCreateShow: false,
    isOrderShow: false,
    isUpdateShow: false,
  }

  columns = [
    {
      title: '产品类型名称',
      dataIndex: 'productTypeName',
    },
    {
      title: '是否实物',
      dataIndex: 'isPhysical',
      render(val) {
        return val === '0'? '否': '是';
      },
    },
    {
      title: '是否虚拟',
      dataIndex: 'isDigital',
      render(val) {
        return val === '0'? '否': '是';
      },
    },
    {
      title: '是否有表',
      dataIndex: 'hasTable',
      render(val) {
        return val === '0'? '无': '有';
      },
    },
    {
      title: '描述',
      dataIndex: 'descript',
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
      type: 'productType/tree',
      payload: {
        type: 'type',
        id: 'productTypeId',
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
      type: 'productType/save',
      payload: {
        type: 'type',
        payload: {
          ...values,
          key: (list.length + 1).toString(),
          productTypeId: (list.length + 1).toString(),
          parentTypeId: "",
        },
      },
    });
    this.handleCreateModal(false);
    dispatch({
      type: 'productType/tree',
      payload: {
        type: 'type',
        id: 'productTypeId',
        pId: 'parentTypeId',
      }
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
      type: 'productType/update',
      payload: {
        type: 'type',
        payload: { 
          ...values,
          key: values.productTypeId 
        },
      },
    });
    this.handleUpdateModal(false);
    dispatch({
      type: 'productType/tree',
      payload: {
        type: 'type',
        id: 'productTypeId',
        pId: 'parentTypeId',
      }
    });
  }

  handleUpdate = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productType/findOne',
      payload: {
        type: 'type',
        id: record.productTypeId
      }
    });
    this.handleUpdateModal(true);
  }

  handleRemove = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productType/delete',
      payload: {
        type: 'type',
        id: record.productTypeId
      }
    });
    dispatch({
      type: 'productType/tree',
      payload: {
        type: 'type',
        id: 'productTypeId',
        pId: 'parentTypeId',
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
      <PageHeaderWrapper title="产品类型">
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
              rowKey={record => record.productTypeId}
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

export default ProductType