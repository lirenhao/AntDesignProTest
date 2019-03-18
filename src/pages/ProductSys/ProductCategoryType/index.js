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

@connect(({ productCategoryType, loading }) => ({
  productCategoryType,
  loading: loading.models.product,
}))
class Product extends React.Component {

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
      type: 'productCategoryType/fetch',
    });
  }

  handleAddModal = (visible) => {
    this.setState({isCreateShow: visible})
  }

  handleAddForm = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productCategoryType/submitAddForm',
      payload: values,
      callback: () => this.handleAddModal(false)
    });
  }

  render() {
    const {
      loading,
      productCategoryType: {
        data,
      }
    } = this.props
    const { isCreateShow } = this.state

    return (
      <PageHeaderWrapper title="产品类别类型">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleAddModal(true)}>
                新建
              </Button>
            </div>
            <Table
              loading={loading}
              dataSource={data.list}
              pagination={data.pagination}
              columns={this.columns}
            />
          </div>
        </Card>
        <Create 
          visible={isCreateShow} 
          hideModal={() => this.handleAddModal(false)} 
          handleFormSubmit={this.handleAddForm}
        />
      </PageHeaderWrapper>
    )
  }
}

export default Product