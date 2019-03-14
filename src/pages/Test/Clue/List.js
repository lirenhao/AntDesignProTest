import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SignForm from './SignForm'

import styles from './List.less';

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ clue, loading }) => ({
  clue,
  loading: loading.models.rule,
}))
@Form.create()
class List extends PureComponent {
  state = {
    signModalVisible: false,
    selectedRows: [],
    formValues: {},
    signFormValues: {},
  };

  columns = [
    {
      title: '编号',
      dataIndex: 'number',
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '手机',
      dataIndex: 'phone',
    },
    {
      title: '电话',
      dataIndex: 'telephone',
    },
    {
      title: '线索来源',
      dataIndex: 'source',
    },
    {
      title: '微信号',
      dataIndex: 'wechat',
    },
    {
      title: '跟进状态',
      dataIndex: 'upStatus',
    },
    {
      title: '跟进时间',
      dataIndex: 'upDate',
    },
    {
      title: '下次跟进',
      dataIndex: 'nextDate',
    },
    {
      title: '沟通记录',
      dataIndex: 'record',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'clue/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'clue/fetch',
      payload: params,
    });
  };

  previewItem = id => {
    // TODO 展示联系人信息
    router.push(`/profile/basic/${id}`);
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  // TODO 选择单选框触发事件
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'clue/fetch',
        payload: values,
      });
    });
  };

  handleSignModalVisible = (flag, record) => {
    this.setState({
      signModalVisible: !!flag,
      signFormValues: record || {},
    });
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row>
          <Col span={24}>
            <Form.Item label="线索来源">
              {getFieldDecorator('source', {
                initialValue: "0",
              })(
                <Radio.Group>
                  <Radio.Button value="0">全部</Radio.Button>
                  <Radio.Button value="1">独立开发</Radio.Button>
                  <Radio.Button value="2">线下渠道</Radio.Button>
                  <Radio.Button value="3">二次开发</Radio.Button>
                  <Radio.Button value="4">转介绍</Radio.Button>
                  <Radio.Button value="5">客服电话</Radio.Button>
                  <Radio.Button value="6">百度推广</Radio.Button>
                  <Radio.Button value="7">360推广</Radio.Button>
                  <Radio.Button value="8">搜狗推广</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="用户状态">
              {getFieldDecorator('status', {
                initialValue: "0",
              })(
                <Radio.Group>
                  <Radio.Button value="0">全部</Radio.Button>
                  <Radio.Button value="1">有效</Radio.Button>
                  <Radio.Button value="2">无效</Radio.Button>
                  <Radio.Button value="3">重点</Radio.Button>
                  <Radio.Button value="4">有意向</Radio.Button>
                  <Radio.Button value="5">无意向</Radio.Button>
                  <Radio.Button value="6">关闭</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="跟进状态">
              {getFieldDecorator('upStatus', {
                initialValue: "0",
              })(
                <Radio.Group>
                  <Radio.Button value="0">全部</Radio.Button>
                  <Radio.Button value="1">初次联系</Radio.Button>
                  <Radio.Button value="2">二次跟进</Radio.Button>
                  <Radio.Button value="3">多次跟进</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      clue: { data },
      loading,
    } = this.props;
    const { selectedRows, signModalVisible, signFormValues } = this.state;
    const signMethods = {
      handleSignModalVisible: this.handleSignModalVisible,
    };
    return (
      <PageHeaderWrapper title="线索表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="form" type="primary" onClick={() => this.handleSignModalVisible(true)}>
                签合同
              </Button>
              <Button icon="edit" type="primary" onClick={() => this.handleSignModalVisible(true)}>
                直接下单
              </Button>
              <Button icon="enter" type="primary" onClick={() => this.handleSignModalVisible(true)}>
                转移
              </Button>
              <Button icon="rollback" type="primary" onClick={() => this.handleSignModalVisible(true)}>
                放入公海
              </Button>
              <Button icon="message" type="primary" onClick={() => this.handleSignModalVisible(true)}>
                发短信
              </Button>
              <Button icon="retweet" type="primary" onClick={() => this.handleSignModalVisible(true)}>
                线索合并
              </Button>
              <Button icon="delete" type="primary" onClick={() => this.handleSignModalVisible(true)}>
                删除
              </Button>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <SignForm
          {...signMethods}
          signModalVisible={signModalVisible}
          values={signFormValues}
        />
      </PageHeaderWrapper>
    );
  }
}

export default List;