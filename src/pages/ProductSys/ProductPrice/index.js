import React from 'react'
import { connect } from 'dva'
import {
  Card,
  Table,
  Form,
  Row,
  Col,
  Select,
  Button,
  Divider,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import Create from './Create'

import styles from '../table.less'

@connect(({ productPrice, productType, loading }) => ({
  productPrice,
  priceType: productType.priceType,
  pricePurpose: productType.pricePurpose,
  loading: loading.models.productPrice,
}))
@Form.create()
class Product extends React.Component {

  state = {
    isCreateShow: false,
  }

  columns = [
    {
      title: '产品特征类型',
      dataIndex: 'productPriceTypeId',
      render: (id) => {
        const { priceType } = this.props
        return priceType[id] ? priceType[id].description : null
      },
    },
    {
      title: '产品价格用途',
      dataIndex: 'productPricePurposeId',
      render: (id) => {
        const { pricePurpose } = this.props
        return pricePurpose[id] ? pricePurpose[id].description : null
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
          <a onClick={() => {}}>删除</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleCreateModal(true, record)}>修改</a>
        </React.Fragment>
      ),
    },
  ]

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'productPrice/fetch',
    });
  }

  handleCreateModal = (visible) => {
    this.setState({isCreateShow: visible})
  }

  handleCreateForm = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productPrice/submitCreateForm',
      payload: values,
      callback: () => this.handleCreateModal(false)
    });
  }

  render() {
    const {
      loading,
      priceType,
      pricePurpose,
      productPrice: {
        data,
      },
      form: {
        getFieldDecorator
      },
    } = this.props
    const {
      isCreateShow,
    } = this.state
    
    return (
      <PageHeaderWrapper title="产品价格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col md={8} sm={24}>
                    <Form.Item label="产品价格类型">
                      {getFieldDecorator('productPriceTypeId')(
                        <Select placeholder="请选择" style={{ width: '100%' }}>
                          {Object.keys(priceType).map(key => (
                            <Select.Option value={key}>{priceType[key].description}</Select.Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col md={8} sm={24}>
                    <Form.Item label="产品价格用途">
                      {getFieldDecorator('productPricePurposeId')(
                        <Select placeholder="请选择" style={{ width: '100%' }}>
                          {Object.keys(pricePurpose).map(key => (
                            <Select.Option value={key}>{pricePurpose[key].description}</Select.Option>
                          ))}
                        </Select>
                      )}
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
        />
      </PageHeaderWrapper>
    )
  }
}

export default Product