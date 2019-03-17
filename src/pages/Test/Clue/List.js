import React, { PureComponent , Fragment } from 'react'
import { connect } from 'dva'
import router from 'umi/router'
import {
  Card,
  Form,
  Button,
} from 'antd'
import { FormattedMessage } from 'umi/locale'
import StandardFormRow from '@/components/StandardFormRow'
import TagSelect from '@/components/TagSelect'
import StandardTable from '@/components/StandardTable'
import SignForm from './SignForm'

import styles from './List.less'

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
    {
      title: '操作',
      render: () => (
        <Fragment>
          <a onClick={() => router.push('/test/clue/sign')}>签合同</a>
        </Fragment>
      ),
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

  previewItem = () => {
    // TODO 展示联系人信息
    router.push('/test/clue/sign');
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSignModalVisible = (flag, record) => {
    this.setState({
      signModalVisible: !!flag,
      signFormValues: record || {},
    });
  }

  render() {
    const {
      clue: { data },
      loading,
    } = this.props;
    const { selectedRows, signModalVisible, signFormValues } = this.state;
    const actionsTextMap = {
      expandText: <FormattedMessage id="component.tagSelect.expand" defaultMessage="Expand" />,
      collapseText: (
        <FormattedMessage id="component.tagSelect.collapse" defaultMessage="Collapse" />
      ),
      selectAllText: <FormattedMessage id="component.tagSelect.all" defaultMessage="All" />,
    };
    const signMethods = {
      handleSignModalVisible: this.handleSignModalVisible,
    };
    return (
      <Fragment>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <StandardFormRow title="线索来源">
                <TagSelect actionsText={actionsTextMap}>
                  <TagSelect.Option value="1">独立开发</TagSelect.Option>
                  <TagSelect.Option value="2">线下渠道</TagSelect.Option>
                  <TagSelect.Option value="3">二次开发</TagSelect.Option>
                  <TagSelect.Option value="4">转介绍</TagSelect.Option>
                  <TagSelect.Option value="5">客服电话</TagSelect.Option>
                  <TagSelect.Option value="6">百度推广</TagSelect.Option>
                  <TagSelect.Option value="7">360推广</TagSelect.Option>
                  <TagSelect.Option value="8">搜狗推广</TagSelect.Option>
                </TagSelect>
              </StandardFormRow>
              <StandardFormRow title="用户状态">
                <TagSelect actionsText={actionsTextMap}>
                  <TagSelect.Option value="1">有效</TagSelect.Option>
                  <TagSelect.Option value="2">无效</TagSelect.Option>
                  <TagSelect.Option value="3">重点</TagSelect.Option>
                  <TagSelect.Option value="4">有意向</TagSelect.Option>
                  <TagSelect.Option value="5">无意向</TagSelect.Option>
                  <TagSelect.Option value="6">关闭</TagSelect.Option>
                </TagSelect>
              </StandardFormRow>
              <StandardFormRow title="跟进状态">
                <TagSelect actionsText={actionsTextMap}>
                  <TagSelect.Option value="1">初次联系</TagSelect.Option>
                  <TagSelect.Option value="2">二次跟进</TagSelect.Option>
                  <TagSelect.Option value="3">多次跟进</TagSelect.Option>
                </TagSelect>
              </StandardFormRow>
            </div>
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
      </Fragment>
    );
  }
}

export default List;