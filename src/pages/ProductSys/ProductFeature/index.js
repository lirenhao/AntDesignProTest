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
  message,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import Create from './Create'

import styles from '../table.less'

@connect(({ productFeature, productType, loading }) => ({
  data: productFeature.data,
  featureType: productType.featureType,
  featureTypeTree: productType.tree.featureType || [{}],
  loading: loading.models.productFeature,
}))
@Form.create()
class Product extends React.Component {

  state = {
    isCreateShow: false,
    isUpdateShow: false,
    info: {},
  }

  columns = [
    {
      title: '产品特征类型',
      dataIndex: 'productFeatureTypeId',
      render: (id) => {
        const { featureType } = this.props
        return featureType[id] ? featureType[id].description : null
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: 'uomId',
      dataIndex: 'uomId',
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
          <a onClick={() => this.handleRemove(record)}>删除</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleUpdate(record)}>修改</a>
        </React.Fragment>
      ),
    },
  ]

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'productFeature/findAll',
      payload: {
        type: 'feature',
      }
    });
    dispatch({
      type: 'productType/tree',
      payload: {
        type: 'featureType',
        id: 'productFeatureTypeId',
        pId: 'parentTypeId',
        title: 'description',
      }
    });
  }

  handleAddModal = (visible) => {
    this.setState({isCreateShow: visible})
  }

  handleAddForm = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productFeature/save',
      payload: {
        type: 'feature',
        payload: {id: 'productFeatureId', ...record},
      },
      callback: () => this.handleAddModal(false)
    });
  }

  handleUpdateModal = (visible) => {
    this.setState({isUpdateShow: visible})
  }

  handleUpdate = (record) => {
    this.setState({info: record})
    this.handleUpdateModal(true);
  }

  handleUpdateForm = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productFeature/update',
      payload: {
        type: 'feature',
        key: record.productFeatureId,
        payload: record,
      },
      callback: () => this.handleUpdateModal(false)
    });
  }

  handleRemove = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productFeature/remove',
      payload: {
        type: 'feature',
        key: record.productFeatureId,
      },
      callback: () => message.success('删除成功'),
    });
  }

  render() {
    const {
      loading,
      data: {
        list,
        pagination,
      },
      form: {
        getFieldDecorator
      },
      featureTypeTree,
    } = this.props
    const { 
      isCreateShow, 
      isUpdateShow,
      info,
    } = this.state

    return (
      <PageHeaderWrapper title="产品特征">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col md={8} sm={24}>
                    <Form.Item label="产品特征类型">
                      {getFieldDecorator('productFeatureTypeId')(
                        <TreeSelect
                          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                          placeholder="请选择"
                          treeDefaultExpandAll
                          treeData={featureTypeTree[0].children}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col md={8} sm={24}>
                    <Form.Item label="描述">
                      {getFieldDecorator('description')(<Input placeholder="请输入" />)}
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
              dataSource={list}
              pagination={pagination}
              columns={this.columns}
            />
          </div>
        </Card>
        <Create 
          visible={isCreateShow} 
          hideModal={() => this.handleAddModal(false)} 
          handleFormSubmit={this.handleAddForm}
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

export default Product