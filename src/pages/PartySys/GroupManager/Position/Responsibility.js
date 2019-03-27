import React, {
  PureComponent,
  Fragment
} from 'react'
import { connect } from 'dva'
import {
  Table,
  Button,
  TreeSelect,
  DatePicker,
  Input,
  message,
  Popconfirm,
  Divider,
} from 'antd'
import moment from 'moment'

@connect(({ party, infra, type: sysType }) => ({
  list: party.list.emplPositionResponsibility || [],
  emplPositionList: infra.list.emplPosition,
  responsibilityType: sysType.responsibilityType || {},
  responsibilityTypeTree: sysType.tree.responsibilityType,
}))
class Responsibility extends PureComponent {
  index = 0;

  state = {
    loading: false,
    data: {},
  }

  componentDidMount() {
    const { dispatch, emplPositionId } = this.props;
    dispatch({
      type: 'type/tree',
      payload: {
        type: 'responsibilityType', 
        id: 'responsibilityTypeId', 
        pId: 'parentTypeId', 
        title: 'responsibilityTypeName',
      },
    });
    dispatch({
      type: 'party/findByUnionId',
      payload: {
        type: 'emplPositionResponsibility',
        unionId: emplPositionId,
      },
    });
  }

  newRow = () => {
    const { emplPositionId } = this.props;
    const { data } = this.state;
    const key = `new-${this.index}`;
    const target = {
      key: `new-${this.index}`,
      emplPositionId,
      fromDate: '',
      thruDate: '',
      comments: '',
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
    const target = list.filter(item => `${item.emplPositionId}-${item.responsibilityTypeId}`=== key)[0] || {};
    this.setState({ data: {...data, [key]: {...target, editable: true}}});
  }

  remove(key) {
    const { data } = this.state;
    if(key.split('-')[0] === 'new'){
      delete data[key];
      this.setState({ data: {...data}, });
    } else {
      const { dispatch, emplPositionId } = this.props;
      dispatch({
        type: 'party/remove',
        payload: {
          type: 'emplPositionResponsibility',
          key,
          isUnion: true,
          unionId: emplPositionId,
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
    if (!target.responsibilityTypeId || !target.fromDate || !target.thruDate || !target.comments) {
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
    target.key = `${target.emplPositionId}-${target.responsibilityTypeId}`;
    dispatch({
      type: 'party/saveUnion',
      payload: {
        type: 'emplPositionResponsibility',
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
        title: '职位',
        dataIndex: 'emplPositionId',
        key: 'emplPositionId',
        render: (text) => {
          const { emplPositionList } = this.props
          const item = emplPositionList.filter(v => v.emplPositionId === text)[0] || {}
          return item.emplPositionName;
        },
      },
      {
        title: '职责类型',
        dataIndex: 'responsibilityTypeId',
        key: 'responsibilityTypeId',
        render: (text, record) => {
          const { responsibilityTypeTree, responsibilityType } = this.props
          if (record.editable) {
            return (
              <TreeSelect
                value={text}
                onChange={value => this.handleSelectFieldChange(value, 'responsibilityTypeId', record.key)}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                style={{ width: 120 }}
                placeholder="职责类型"
                treeDefaultExpandAll
                treeData={responsibilityTypeTree[0].children}
              />
            );
          }
          return responsibilityType[text] ? responsibilityType[text].responsibilityTypeName : null;
        },
      },
      {
        title: '开始日期',
        dataIndex: 'fromDate',
        key: 'fromDate',
        render: (text, record) => {
          if (record.editable) {
            return (
              <DatePicker 
                value={text? moment(text): null}
                onChange={value => this.handleSelectFieldChange(value.format('YYYY-MM-DD'), 'fromDate', record.key)}
                placeholder='开始日期' 
              />
            );
          }
          return text;
        },
      },
      {
        title: '结束日期',
        dataIndex: 'thruDate',
        key: 'thruDate',
        render: (text, record) => {
          if (record.editable) {
            return (
              <DatePicker 
                value={text? moment(text): null}
                onChange={value => this.handleSelectFieldChange(value.format('YYYY-MM-DD'), 'thruDate', record.key)}
                placeholder='结束日期' 
              />
            );
          }
          return text;
        },
      },
      {
        title: '评论',
        dataIndex: 'comments',
        key: 'comments',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'comments', record.key)}
                placeholder='评论' 
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
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
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

    const { list } = this.props;
    const { loading, data } = this.state;

    const dataSource = list.map(item => ({
      ...item,
      ...data[`${item.emplPositionId}-${item.responsibilityTypeId}`],
    }))
    Object.keys(data).forEach(key => {
      if(key.split('-')[0] === 'new')
        dataSource.push(data[key])
    })

    return (
      <Fragment>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey={record => `${record.emplPositionId}-${record.responsibilityTypeId}-${record.key}`}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newRow}
          icon="plus"
        >
          添加职位职责
        </Button>
      </Fragment>
    );
  }
}

export default Responsibility