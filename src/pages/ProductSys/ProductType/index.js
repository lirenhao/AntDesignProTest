import React from 'react'
import { connect } from 'dva'
import {
  Card,
  Table,
  Button,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import Create from './Create'
import Update from './Update'

import styles from '../table.less'

@connect(({ productType, loading }) => ({
  list: productType.list,
  loading: loading.models.productType,
}))
class ProductType extends React.Component {

  state = {
    isCreateShow: false,
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

  handleUpdateModal = (visible) => {
    this.setState({isUpdateShow: visible})
  }

  handleCreateForm = (values) => {
    const { list, dispatch } = this.props;
    dispatch({
      type: 'productType/save',
      payload: {
        type: 'type',
        payload: {
          ...values,
          key: list.length + 1,
          productTypeId: list.length + 1,
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

  handleUpdateForm = (values) => {
    console.log(values)
  }

  render() {
    const {
      loading,
      list,
    } = this.props
    const { isCreateShow, isUpdateShow } = this.state
    return (
      <PageHeaderWrapper title="产品类型">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleCreateModal(true)}>
                新建
              </Button>
              <Button icon="drag" type="primary" onClick={() => this.handleUpdateModal(true)}>
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
        />
        <Update 
          visible={isUpdateShow} 
          hideModal={() => this.handleUpdateModal(false)} 
          handleFormSubmit={this.handleUpdateForm}
          dataSource={list}
        />
      </PageHeaderWrapper>
    )
  }
}

export default ProductType