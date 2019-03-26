import React, {
  PureComponent,
  Fragment
} from 'react'
import { connect } from 'dva'
import {
  Table,
  Button,
  Select,
  TreeSelect,
  DatePicker,
  InputNumber,
  message,
  Popconfirm,
  Divider,
} from 'antd'
import moment from 'moment'

@connect(({ productFeatureApply, productFeature, productType }) => ({
  list: productFeatureApply.list,
  feature: productFeature.data.list,
  applTypeTree: productType.tree.featureApplType,
  featureApplType: productType.featureApplType,
}))
class Apply extends PureComponent {
  index = 0;

  state = {
    loading: false,
    data: {},
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'productFeature/findAll',
      payload: {
        type: 'feature',
      },
    });
    dispatch({
      type: 'productType/tree',
      payload: {
        type: 'featureApplType', 
        id: 'productFeatureApplTypeId', 
        pId: 'parentTypeId', 
        title: 'description',
      },
    });
    const { productId } = this.props;
    dispatch({
      type: 'productFeatureApply/fetch',
      payload: productId,
    });
  }

  newRow = () => {
    const { productId } = this.props;
    const { data } = this.state;
    const key = `new-${this.index}`;
    const target = {
      key: `new-${this.index}`,
      productId,
      productFeatureId: '',
      productFeatureApplTypeId: '',
      fromDate: '',
      thruDate: '',
      sequenceNum: '',
      amount: '',
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
    const target = list.filter(item => `${item.productFeatureId}-${item.productId}`=== key)[0] || {};
    this.setState({ data: {...data, [key]: {...target, editable: true}}});
  }

  remove(key) {
    const { data } = this.state;
    if(key.split('-')[0] === 'new'){
      delete data[key];
      this.setState({ data: {...data}, });
    } else {
      const { dispatch, productId } = this.props;
      dispatch({
        type: 'productFeatureApply/remove',
        payload: {
          key,
          productId,
        },
        callback: () => {
          delete data[key];
          this.setState({ loading: false, data: {...data}, });
        }
      });
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
    if (!target.productFeatureId || !target.productId || !target.productFeatureApplTypeId || 
      !target.fromDate || !target.thruDate || !target.sequenceNum || !target.amount) {
      message.error('请填写完整特征适应性信息');
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
    target.key = `${target.productFeatureId}-${target.productId}`;
    dispatch({
      type: 'productFeatureApply/save',
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
        title: '产品特征',
        dataIndex: 'productFeatureId',
        key: 'productFeatureId',
        render: (text, record) => {
          const { feature } = this.props
          if (record.editable) {
            return (
              <Select 
                value={text === '' ? undefined : text} 
                onChange={value => this.handleSelectFieldChange(value, 'productFeatureId', record.key)}
                placeholder="产品特征" 
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                style={{ width: 120 }}
              >
                {feature.map(item => (
                  <Select.Option key={item.productFeatureId}>{item.description}</Select.Option>
                ))}
              </Select>
            );
          }
          const item = feature.filter(v => v.productFeatureId === text)[0] || {}
          return item.description;
        },
      },
      {
        title: '特征适用性类型',
        dataIndex: 'productFeatureApplTypeId',
        key: 'productFeatureApplTypeId',
        render: (text, record) => {
          const { applTypeTree, featureApplType } = this.props
          if (record.editable) {
            return (
              <TreeSelect
                value={text}
                onChange={e => this.handleSelectFieldChange(e, 'productFeatureApplTypeId', record.key)}
                treeDefaultExpandAll
                treeData={applTypeTree[0].children}
                placeholder="适用性类型"
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                style={{ width: '100%' }}
              />
            );
          }
          return featureApplType[text] ? featureApplType[text].description : null;
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
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        render: (text, record) => {
          if (record.editable) {
            return (
              <InputNumber
                value={text}
                onChange={e => this.handleSelectFieldChange(e, 'amount', record.key)}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                placeholder='金额' 
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
      ...data[`${item.productFeatureId}-${item.productId}`],
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
          rowKey={record => `${record.productFeatureId}-${record.productId}-${record.key}`}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newRow}
          icon="plus"
        >
          添加特征适用性
        </Button>
      </Fragment>
    );
  }
}

export default Apply