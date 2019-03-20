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

import styles from '../table.less'

@connect(({ productType, loading }) => ({
  list: productType.list,
  info: productType.info,
  loading: loading.models.productFeatureType,
}))
class ProductFeatureType extends React.Component {

  state = {
    isCreateShow: false,
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
      type: 'productType/find',
      payload: {
        type: 'featureType',
      }
    });
  }

  handleCreateModal = (visible) => {
    this.setState({isCreateShow: visible})
  }

  handleCreateForm = (values) => {
    const { dispatch, list } = this.props;
    dispatch({
      type: 'productType/add',
      payload: {
        type: 'featureType',
        payload: {
          ...values,
          key: (list.length + 100).toString(),
          productFeatureTypeId: (list.length + 100).toString(),
          parentTypeId: "",
        },
      },
      callback: () => this.handleCreateModal(false),
    });
  }

  handleRemove = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productType/remove',
      payload: {
        type: 'featureType',
        id: record.productFeatureTypeId
      }
    });
  }

  handleUpdate = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productType/findOne',
      payload: {
        type: 'featureType',
        id: record.productFeatureTypeId
      }
    });
    this.handleUpdateModal(true);
  }

  handleUpdateModal = (visible) => {
    this.setState({isUpdateShow: visible})
  }

  handleUpdateForm = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productType/edit',
      payload: {
        type: 'featureType',
        payload: { 
          ...values,
          key: values.productFeatureTypeId 
        },
      },
      callback: () => this.handleUpdateModal(false),
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
      isUpdateShow
    } = this.state
    
    return (
      <PageHeaderWrapper title="产品特征类型">
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
      </PageHeaderWrapper>
    )
  }
}

export default ProductFeatureType