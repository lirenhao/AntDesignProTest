import React, {
  PureComponent,
  Fragment
} from 'react'
import { connect } from 'dva'
import {
  Table,
  Button,
  Select,
  Input,
  DatePicker,
  InputNumber,
  message,
  Popconfirm,
  Divider,
} from 'antd'
import moment from 'moment'

@connect(({ productAssoc, product }) => ({
  list: productAssoc.list || [],
  product: product.data.list,
}))
class Apply extends PureComponent {
  index = 0;

  state = {
    loading: false,
    data: {},
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { assocTypeId } = this.props;
    dispatch({
      type: 'productAssoc/fetch',
      payload: assocTypeId,
    });
    dispatch({
      type: 'product/findAll',
      payload: {
        type: 'product',
      }
    });
  }

  newRow = () => {
    const { assocTypeId } = this.props;
    const { data } = this.state;
    const key = `new-${this.index}`;
    const target = {
      key: `new-${this.index}`,
      productAssocTypeId: assocTypeId,
      productId: '',
      productIdTo: '',
      fromDate: '',
      thruDate: '',
      sequenceNum: '',
      reason: '',
      quantity: '',
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
    const target = list.filter(item => `${item.productId}-${item.productIdTo}-${item.productAssocTypeId}`=== key)[0] || {};
    target.editable = true;
    this.setState({ data: {...data, [key]: target}});
  }

  remove(key) {
    const { data } = this.state;
    if(key.split('-')[0] === 'new'){
      delete data[key];
      this.setState({ data: {...data}, });
    } else {
      const { dispatch, assocTypeId } = this.props;
      dispatch({
        type: 'productAssoc/remove',
        payload: {
          key,
          assocTypeId,
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
    if (!target.productId || !target.productIdTo || !target.sequenceNum || 
      !target.fromDate || !target.thruDate || !target.quantity) {
      message.error('请填写完整产品关联信息');
      e.target.focus();
      this.setState({
        loading: false,
        data: [],
      });
      return;
    }
    delete target.isNew
    delete target.editable
    const { dispatch } = this.props;
    target.key = `${target.productId}-${target.productIdTo}-${target.productAssocTypeId}`;
    dispatch({
      type: 'productAssoc/save',
      payload: target,
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
        title: '源产品',
        dataIndex: 'productId',
        key: 'productId',
        render: (text, record) => {
          const { product } = this.props
          if (record.editable) {
            return (
              <Select 
                value={text === '' ? undefined : text} 
                onChange={value => this.handleSelectFieldChange(value, 'productId', record.key)}
                placeholder="源产品" 
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                style={{ width: 120 }}
              >
                {product.map(item => (
                  <Select.Option key={item.productId}>{item.productName}</Select.Option>
                ))}
              </Select>
            );
          }
          const item = product.filter(v => v.productId === text)[0] || {}
          return item.productName;
        },
      },
      {
        title: '目标产品',
        dataIndex: 'productIdTo',
        key: 'productIdTo',
        render: (text, record) => {
          const { product } = this.props
          if (record.editable) {
            return (
              <Select 
                value={text === '' ? undefined : text} 
                onChange={value => this.handleSelectFieldChange(value, 'productIdTo', record.key)}
                placeholder="目标产品" 
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                style={{ width: 120 }}
              >
                {product.map(item => (
                  <Select.Option key={item.productId}>{item.productName}</Select.Option>
                ))}
              </Select>
            );
          }
          const item = product.filter(v => v.productId === text)[0] || {}
          return item.productName;
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
                onChange={e => this.handleSelectFieldChange(e.format('YYYY-MM-DD'), 'fromDate', record.key)}
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
                onChange={e => this.handleSelectFieldChange(e.format('YYYY-MM-DD'), 'thruDate', record.key)}
                placeholder='结束日期' 
              />
            );
          }
          return text;
        },
      },
      {
        title: '序列号',
        dataIndex: 'sequenceNum',
        key: 'sequenceNum',
        render: (text, record) => {
          if (record.editable) {
            return (
              <InputNumber
                value={text}
                onChange={e => this.handleSelectFieldChange(e, 'sequenceNum', record.key)}
                placeholder='序列号' 
              />
            );
          }
          return text;
        },
      },
      {
        title: '原因',
        dataIndex: 'reason',
        key: 'reason',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'reason', record.key)}
                placeholder='原因' 
              />
            );
          }
          return text;
        },
      },
      {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (text, record) => {
          if (record.editable) {
            return (
              <InputNumber
                value={text}
                onChange={e => this.handleSelectFieldChange(e, 'quantity', record.key)}
                placeholder='数量' 
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
      ...data[`${item.productId}-${item.productIdTo}-${item.productAssocTypeId}`],
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
          rowKey={item => `${item.productId}-${item.productIdTo}-${item.productAssocTypeId}`}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newRow}
          icon="plus"
        >
          添加产品关联
        </Button>
      </Fragment>
    );
  }
}

export default Apply