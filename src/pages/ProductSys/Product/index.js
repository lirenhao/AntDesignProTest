import React from 'react'
import { connect } from 'dva'
import {
  Card,
  Table,
  Form,
  Row,
  Col,
  Input,
  TreeSelect,
  Button,
  Divider,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import Create from './Create'

import styles from '../table.less'

@connect(({ product, productType, loading }) => ({
  product,
  type: productType.type,
  typeTree: productType.tree.type || [{}],
  loading: loading.models.product,
}))
@Form.create()
class Product extends React.Component {

  state = {
    isCreateShow: false
  }

  columns = [
    {
      title: '产品名称',
      dataIndex: 'productName',
    },
    {
      title: '产品类型',
      dataIndex: 'productTypeId',
      render: (id) => {
        const { type } = this.props
        return type[id] ? type[id].productTypeName : null
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
          <a>删除</a>
          <Divider type="vertical" />
          <a>修改</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleFeature(true, record)}>特征</a>
        </React.Fragment>
      ),
    },
  ]

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'product/fetch',
    });
    dispatch({
      type: 'productType/tree',
      payload: {
        type: 'type',
        id: 'productTypeId',
        pId: 'parentTypeId',
        title: 'productTypeName',
      }
    });
  }

  handleAddModal = (visible) => {
    this.setState({isCreateShow: visible})
  }

  handleAddForm = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'product/submitAddForm',
      payload: record,
      callback: () => this.handleAddModal(false)
    });
  }

  handleFeature = (visible, record) => {
    console.log(visible, record)
  }

  render() {
    const {
      loading,
      product: {
        data,
      },
      form: {
        getFieldDecorator
      },
      typeTree,
    } = this.props
    const { isCreateShow } = this.state

    return (
      <PageHeaderWrapper title="产品">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col md={8} sm={24}>
                    <Form.Item label="产品类型">
                      {getFieldDecorator('productTypeId')(
                        <TreeSelect
                          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                          placeholder="请选择"
                          treeDefaultExpandAll
                          treeData={typeTree[0].children}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col md={8} sm={24}>
                    <Form.Item label="产品名称">
                      {getFieldDecorator('productName')(<Input placeholder="请输入" />)}
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