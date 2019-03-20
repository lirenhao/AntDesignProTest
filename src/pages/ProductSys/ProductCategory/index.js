import React from 'react'
import { connect } from 'dva'
import {
  Card,
  Table,
  Form,
  Row,
  Col,
  Input,
  Select,
  Button,
  Divider,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import Create from './Create'
import Rollup from './Rollup'

import styles from '../table.less'

@connect(({ productCategory, productType, loading }) => ({
  productCategory,
  categoryType: productType.categoryType,
  loading: loading.models.productCategory,
}))
@Form.create()
class Product extends React.Component {

  state = {
    isCreateShow: false,
    isRollupShow: false,
  }

  columns = [
    {
      title: '产品类别名称',
      dataIndex: 'categoryName',
    },
    {
      title: '产品类别类型',
      dataIndex: 'productCategoryTypeId',
      render: (id) => {
        const { categoryType } = this.props
        return categoryType[id] ? categoryType[id].description : null
      },
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
          <a onClick={() => this.handleRollup(true, record)}>隶属</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleCreateModal(true)}>修改</a>
        </React.Fragment>
      ),
    },
  ]

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'productCategory/fetch',
    });
  }

  handleCreateModal = (visible) => {
    this.setState({isCreateShow: visible})
  }

  handleCreateForm = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productCategory/submitCreateForm',
      payload: values,
      callback: () => this.handleCreateModal(false)
    });
  }

  handleRollup = (visible, record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'productCategory/info',
      payload: record
    })
    this.handleRollupModal(visible)
  }

  handleRollupModal = (visible) => {
    this.setState({isRollupShow: visible})
  }

  handleRollupForm = (values) => {
    console.log(values)
  }

  render() {
    const {
      loading,
      productCategory: {
        data,
      },
      form: {
        getFieldDecorator
      },
      categoryType,
    } = this.props
    const { isCreateShow, isRollupShow } = this.state

    return (
      <PageHeaderWrapper title="产品类别">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col md={8} sm={24}>
                    <Form.Item label="产品类别类型">
                      {getFieldDecorator('productCategoryTypeId')(
                        <Select placeholder="请选择" style={{ width: '100%' }}>
                          {Object.keys(categoryType).map(key => (
                            <Select.Option value={key}>{categoryType[key].description}</Select.Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col md={8} sm={24}>
                    <Form.Item label="产品类别名称">
                      {getFieldDecorator('productCategoryName')(<Input placeholder="请输入" />)}
                    </Form.Item>
                  </Col>
                  <Col md={8} sm={24}>
                    <span className={styles.submitButtons}>
                      <Button type="primary" htmlType="submit">
                        查询
                      </Button>
                      <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                        重置
                      </Button>
                    </span>
                  </Col>
                </Row>
              </Form>
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleCreateModal(true)}>
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
          hideModal={() => this.handleCreateModal(false)} 
          handleFormSubmit={this.handleCreateForm}
          categorys={data.list.map(item => ({key: item.productCategoryId, title: item.categoryName}))}
        />
        <Rollup
          visible={isRollupShow} 
          hideModal={() => this.handleRollupModal(false)} 
          handleFormSubmit={this.handleRollupForm}
          categorys={data.list.map(item => ({key: item.productCategoryId, title: item.categoryName}))}
        />
      </PageHeaderWrapper>
    )
  }
}

export default Product