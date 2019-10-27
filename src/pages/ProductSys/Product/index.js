import React from 'react';
import { connect } from 'dva';
import { Card, Table, Form, Row, Col, Input, TreeSelect, Button, Divider, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { objToTree } from '@/utils/utils';
import Create from './Create';

import styles from '../table.less';

@connect(({ product, loading }) => ({
  data: product.data,
  productType: product.dict.productType,
  loading: loading.models.product,
}))
@Form.create()
class Product extends React.Component {
  state = {
    isCreateShow: false,
    isUpdateShow: false,
    info: {},
  };

  columns = [
    {
      title: '产品名称',
      dataIndex: 'productName',
    },
    {
      title: '产品类型',
      dataIndex: 'productTypeId',
      render: id => {
        const { productType } = this.props;
        return productType[id] ? productType[id].productTypeName : null;
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
          <a onClick={() => this.handleRemove(record)}>删除</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleUpdate(record)}>修改</a>
        </React.Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'product/findDict' });
    dispatch({
      type: 'product/findAll',
      payload: {
        type: 'product',
      },
    });
    dispatch({
      type: 'type/tree',
      payload: {
        type: 'productType',
        id: 'productTypeId',
        pId: 'parentTypeId',
        title: 'productTypeName',
      },
    });
  }

  handleAddModal = visible => {
    this.setState({ isCreateShow: visible });
  };

  handleAddForm = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'product/save',
      payload: {
        type: 'product',
        payload: { id: 'productId', ...record },
      },
      callback: () => this.handleAddModal(false),
    });
  };

  handleUpdateModal = visible => {
    this.setState({ isUpdateShow: visible });
  };

  handleUpdate = record => {
    this.setState({ info: record });
    this.handleUpdateModal(true);
  };

  handleUpdateForm = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'product/update',
      payload: {
        type: 'product',
        key: record.productId,
        payload: record,
      },
      callback: () => this.handleUpdateModal(false),
    });
  };

  handleRemove = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'product/remove',
      payload: {
        type: 'product',
        key: record.productId,
      },
      callback: () => message.success('删除成功'),
    });
  };

  render() {
    const {
      loading,
      data: { list, pagination },
      form: { getFieldDecorator },
      productType,
    } = this.props;
    const { isCreateShow, isUpdateShow, info } = this.state;

    const typeTree = objToTree(
      { productTypeId: '', productTypeName: '父级节点' },
      productType,
      'productTypeId',
      'parentTypeId',
      'productTypeName'
    ).children;

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
                          treeData={typeTree}
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
              dataSource={list}
              pagination={pagination}
              columns={this.columns}
              rowKey={record => record.productId}
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
    );
  }
}

export default Product;
