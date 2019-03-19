import React from 'react'
import { connect } from 'dva'
import {
  Card,
  Table,
  Form,
  Button,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import Create from './Create'

import styles from '../table.less'

@connect(({ productPriceType, loading }) => ({
  productPriceType,
  loading: loading.models.productPriceType,
}))
@Form.create()
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
      type: 'productPriceType/fetch',
    });
  }

  handleAddModal = (visible) => {
    this.setState({isCreateShow: visible})
  }

  handleAddForm = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productPriceType/submitAddForm',
      payload: values,
      callback: () => this.handleAddModal(false)
    });
  }

  render() {
    const {
      loading,
      productPriceType: {
        data,
      },
    } = this.props
    const { isCreateShow } = this.state

    return (
      <PageHeaderWrapper title="产品价格类型">
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
              pagination={false}
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

export default ProductFeatureType