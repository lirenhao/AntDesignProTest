import React, {
  PureComponent,
} from 'react'
import { connect } from 'dva'
import {
  Drawer,
  Table,
  Button,
  Select,
  Input,
  message,
  Popconfirm,
  Divider,
} from 'antd'

@connect(({ infra }) => ({
  list: infra.list.statusValidChange || [],
  statusList: infra.list.statusItem || [],
}))
class Apply extends PureComponent {
  index = 0;

  state = {
    loading: false,
    data: {},
  }

  componentDidMount() {
    const { dispatch, statusId } = this.props;
    dispatch({
      type: 'infra/findByUnionId',
      payload: {
        type: 'statusValidChange',
        unionId: statusId,
      }
    });
    dispatch({
      type: 'infra/findAll',
      payload: {
        type: 'statusItem',
      }
    });
  }

  newRow = () => {
    const { statusId } = this.props;
    const { data } = this.state;
    const key = `new-${this.index}`;
    const target = {
      key: `new-${this.index}`,
      statusId,
      statusIdTo: '',
      conditionExpression: '',
      transitionName: '',
      description: '',
      editable: true,
      isNew: true,
    };
    this.index += 1;
    this.setState({ data: {...data, [key]: target} });
  }

  editRow = (e, key) => {
    e.preventDefault();
    const { list } = this.props;
    const { data } = this.state;
    const target = list.filter(item => `${item.statusId}-${item.statusIdTo}`=== key)[0] || {};
    this.setState({ data: {...data, [key]: {...target, editable: true}}});
  }

  remove(key) {
    const { data } = this.state;
    if(key.split('-')[0] === 'new'){
      delete data[key];
      this.setState({ data: {...data}, });
    } else {
      const { dispatch, statusId } = this.props;
      dispatch({
        type: 'infra/remove',
        payload: {
          type: 'statusValidChange',
          key,
          isUnion: true,
          unionId: statusId,
        },
        callback: () => {
          delete data[key];
          this.setState({ loading: false, data: {...data}, });
        }
      });
    }
  }

  handleFieldChange(e, fieldName, key) {
    const { data } = this.state;
    const target = data[key] || {};
    if (target) {
      target[fieldName] = e.target.value;
      data[key] = target;
      this.setState({ data: {...data} });
    }
  }

  handleSelectFieldChange(value, fieldName, key) {
    const { data } = this.state;
    const target = data[key] || {};
    if (target) {
      target[fieldName] = value;
      data[key] = target;
      this.setState({ data: {...data} });
    }
  }

  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    if (this.clickedCancel) {
      this.clickedCancel = false;
      return;
    }
    const { data } = this.state
    const target = data[key] ? {...data[key]} : {};
    if (!target.statusId || !target.statusIdTo ||
      !target.conditionExpression || !target.transitionName) {
      message.error('请填写完整信息');
      e.target.focus();
      this.setState({
        loading: false,
      });
      return;
    }
    delete target.isNew
    delete target.editable
    const { dispatch } = this.props;
    target.key = `${target.statusId}-${target.statusIdTo}`;
    dispatch({
      type: 'infra/saveUnion',
      payload: {
        type: 'statusValidChange',
        payload: target,
      },
      callback: () => {
        this.setState({
          loading: false,
          data: Object.keys(data).filter(k => k !== key).map(k => data[k]),
        });
      }
    });
  }

  updateRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    if (this.clickedCancel) {
      this.clickedCancel = false;
      return;
    }
    const { data } = this.state
    const target = data[key] ? {...data[key]} : {};
    if (!target.statusId || !target.statusIdTo ||
      !target.conditionExpression || !target.transitionName) {
      message.error('请填写完整信息');
      e.target.focus();
      this.setState({
        loading: false,
      });
      return;
    }
    delete target.isNew
    delete target.editable
    const { dispatch, statusId } = this.props;
    target.statusId = statusId;
    dispatch({
      type: 'infra/update',
      payload: {
        type: 'statusValidChange',
        key,
        payload: target,
      },
      callback: () => {
        this.setState({
          loading: false,
          data: Object.keys(data).filter(k => k !== key).map(k => data[k]),
        });
      }
    });
  }

  cancel(e, key) {
    e.preventDefault();
    const { data } = this.state;
    delete data[key];
    this.setState({ data: {...data}, });
  }

  render() {
    const columns = [
      {
        title: '有效改变状态',
        dataIndex: 'statusIdTo',
        key: 'statusIdTo',
        render: (text, record) => {
          const { statusList } = this.props
          if (record.editable) {
            return (
              <Select 
                placeholder="有效改变状态"
                onChange={value => this.handleSelectFieldChange(value, 'statusIdTo', record.key)}
                style={{ width: 120 }}
              >
                {statusList.map(item => (
                  <Select.Option key={item.statusId}>{item.statusCode}</Select.Option>
                ))}
              </Select>
            );
          }
          const status = statusList.filter(item => item.statusId === text)[0] || {}
          return status.statusCode;
        },
      },
      {
        title: '条件表达式',
        dataIndex: 'conditionExpression',
        key: 'conditionExpression',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input 
                value={text}
                onChange={e => this.handleFieldChange(e, 'conditionExpression', record.key)}
                placeholder='条件表达式' 
              />
            );
          }
          return text;
        },
      },
      {
        title: '过渡名',
        dataIndex: 'transitionName',
        key: 'transitionName',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input 
                value={text}
                onChange={e => this.handleFieldChange(e, 'transitionName', record.key)}
                placeholder='过渡名' 
              />
            );
          }
          return text;
        },
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'description', record.key)}
                placeholder='描述' 
              />
            );
          }
          return text;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.updateRow(e, record.key)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>取消</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.editRow(e, record.key)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    const { visible, hideModal, list } = this.props;
    const { loading, data } = this.state;

    const dataSource = list.map(item => ({
      ...item,
      ...data[`${item.statusId}-${item.statusIdTo}`],
    }))
    Object.keys(data).forEach(key => {
      if(key.split('-')[0] === 'new')
        dataSource.push(data[key])
    })

    return (
      <Drawer
        width="70%"
        destroyOnClose
        maskClosable={false}
        visible={visible}
        onClose={hideModal}
        style={{
          overflow: 'auto',
          height: 'calc(100% - 108px)',
          paddingBottom: '108px',
        }}
      >
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey={record => `${record.statusId}-${record.statusIdTo}-${record.key}`}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newRow}
          icon="plus"
        >
          添加职位的职责
        </Button>
      </Drawer>
    );
  }
}

export default Apply