import React from 'react';
import { connect } from 'dva';
import { Card, Table, Form, Row, Col, Input, DatePicker, Button, Divider, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Create from './Create';

import styles from '../table.less';

@connect(({ order, loading }) => ({
  data: order.data,
  orderType: order.dict.orderType,
  loading: loading.models.order,
}))
@Form.create()
class Order extends React.Component {
  state = {
    isCreateShow: false,
    isUpdateShow: false,
    info: {},
  };

  columns = [
    {
      title: '订单',
      dataIndex: 'orderId',
    },
    {
      title: '订单编码',
      dataIndex: 'orderCode',
    },
    {
      title: '订单日期',
      dataIndex: 'orderDate',
    },
    {
      title: '订单总金额',
      dataIndex: 'grandTotal',
      render: value => {
        return value;
      },
    },
    {
      title: '状态',
      dataIndex: 'statusId',
      render: value => (value === 'enable' ? '启用' : '暂停'),
    },
    {
      title: '操作',
      render: (_, record) => (
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
    dispatch({ type: 'order/findDict' });
    dispatch({ type: 'order/findAll' });
  }

  handleAddModal = visible => {
    this.setState({ isCreateShow: visible });
  };

  handleAddForm = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/save',
      payload: { ...record },
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
      type: 'order/update',
      payload: {
        key: record.orderId,
        payload: { ...record },
      },
      callback: () => this.handleUpdateModal(false),
    });
  };

  handleRemove = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/remove',
      payload: record.orderId,
      callback: () => message.success('删除成功'),
    });
  };

  render() {
    const {
      loading,
      data,
      form: { getFieldDecorator },
    } = this.props;
    const { isCreateShow, isUpdateShow, info } = this.state;

    return (
      <PageHeaderWrapper title="订单">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col md={8} sm={24}>
                    <Form.Item label="订单编码">
                      {getFieldDecorator('orderCode')(<Input placeholder="请输入" />)}
                    </Form.Item>
                  </Col>
                  <Col md={8} sm={24}>
                    <Form.Item label="订单日期">
                      {getFieldDecorator('orderDate')(
                        <DatePicker
                          style={{
                            width: '100%',
                          }}
                          placeholder="选择订单日期"
                        />
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
              <Button icon="plus" type="primary" onClick={() => this.handleAddModal(true)}>
                创建
              </Button>
            </div>
            <Table
              loading={loading}
              dataSource={data}
              pagination={false}
              columns={this.columns}
              rowKey={record => record.orderId}
            />
          </div>
        </Card>
        <Create
          title="创建订单"
          visible={isCreateShow}
          hideModal={() => this.handleAddModal(false)}
          handleFormSubmit={this.handleAddForm}
          info={{}}
        />
        <Create
          title="编辑订单"
          visible={isUpdateShow}
          hideModal={() => this.handleUpdateModal(false)}
          handleFormSubmit={this.handleUpdateForm}
          info={info}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Order;
