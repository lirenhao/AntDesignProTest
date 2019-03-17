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
  Modal,
  Divider,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

import styles from './index.less'

@connect(({ productType, loading }) => ({
  productType,
  loading: loading.models.productType,
}))
@Form.create()
class ProductType extends React.Component {

  state = {
    isShow: false
  }

  columns = [
    // {
    //   title: '产品类型ID',
    //   dataIndex: 'productTypeId',
    // },
    // {
    //   title: '产品类型父ID',
    //   dataIndex: 'parentTypeId',
    // },
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
          <a onClick={() => this.handleRemove(true, record)}>删除</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>修改</a>
        </React.Fragment>
      ),
    },
  ]

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'productType/fetch',
    });
  }

  handleTableChange = record => {
    console.log(record)
  }

  render() {
    const {
      loading,
      productType: {
        data,
      },
      form: {
        getFieldDecorator
      },
      children,
    } = this.props
    const { isShow } = this.state

    return (
      <PageHeaderWrapper title="产品类型">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col md={8} sm={24}>
                    <Form.Item label="是否实物">
                      {getFieldDecorator('isPhysical')(
                        <Select placeholder="请选择" style={{ width: '100%' }}>
                          <Select.Option value="0">无</Select.Option>
                          <Select.Option value="1">有</Select.Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col md={8} sm={24}>
                    <Form.Item label="是否虚拟">
                      {getFieldDecorator('isDigital')(
                        <Select placeholder="请选择" style={{ width: '100%' }}>
                          <Select.Option value="0">无</Select.Option>
                          <Select.Option value="1">有</Select.Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col md={8} sm={24}>
                    <Form.Item label="是否有表">
                      {getFieldDecorator('hasTable')(
                        <Select placeholder="请选择" style={{ width: '100%' }}>
                          <Select.Option value="0">无</Select.Option>
                          <Select.Option value="1">有</Select.Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col md={8} sm={24}>
                    <Form.Item label="产品类型名称">
                      {getFieldDecorator('productTypeName')(<Input placeholder="请输入" />)}
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
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
            </div>
            <Table
              loading={loading}
              dataSource={data.list}
              pagination={data.pagination}
              columns={this.columns}
              onChange={this.handleTableChange}
            />
          </div>
        </Card>
        <Modal 
          destroyOnClose
          visible={isShow}
        >
          {children}
        </Modal>
      </PageHeaderWrapper>
    )
  }
}

export default ProductType