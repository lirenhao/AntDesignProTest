import React from 'react'
import { connect } from 'dva'
import {
  Card,
  Table,
  Button,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import Create from './Create'

import styles from '../table.less'

@connect(({ productType, loading }) => ({
  list: productType.list,
  loading: loading.models.productFeatureType,
}))
class ProductFeatureType extends React.Component {

  state = {
    isCreateShow: false
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
      type: 'productType/save',
      payload:{
        type: 'featureType',
        payload: {
          ...values,
          key: list.length + 1,
          productFeatureTypeId: list.length + 1,
          parentTypeId: "",
        },
      },
    });
    dispatch({
      type: 'productType/find',
      payload: {
        type: 'featureType',
      }
    });
    this.handleCreateModal(false)
  }

  render() {
    const {
      loading,
      list,
    } = this.props
    const { isCreateShow } = this.state

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
        />
      </PageHeaderWrapper>
    )
  }
}

export default ProductFeatureType