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

  cacheOriginData = {};

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data: props.list || [],
    }
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

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  newMember = () => {
    const { productId } = this.props;
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.push({
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
    });
    this.index += 1;
    this.setState({ data: newData });
  }

  remove(key) {
    const { data } = this.state;
    if(key.split('-')[0] === 'new'){ 
      const newData = data.filter(item => item.key !== key);
      this.setState({ data: newData });
    } else {
      const newData = data.filter(item => item.key !== key);
      const { dispatch, productId } = this.props;
      dispatch({
        type: 'productFeatureApply/remove',
        payload: {
          key,
          productId,
        },
        callback: () => {
          this.setState({ loading: false, data: newData });
        }
      });
    }
  }

  handleSelectFieldChange(value, fieldName, key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = value;
      this.setState({ data: newData });
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
    const target = this.getRowByKey(key) || {};
    if (!target.productFeatureId || !target.productId || !target.productFeatureApplTypeId || 
      !target.fromDate || !target.thruDate || !target.sequenceNum || !target.amount) {
      message.error('请填写完整特征适应性信息');
      e.target.focus();
      this.setState({
        loading: false,
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
        });
      }
    });
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      delete this.cacheOriginData[key];
    }
    target.editable = false;
    this.setState({ data: newData });
    this.clickedCancel = false;
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
                value={text} 
                onChange={value => this.handleSelectFieldChange(value, 'productFeatureId', record.key)}
                placeholder="产品特征" 
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                style={{ width: 120 }}
              >
                {feature.map(item => (
                  <Select.Option value={item.productFeatureId}>{item.description}</Select.Option>
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
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    const { loading, data } = this.state;

    return (
      <Fragment>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          添加特征互作用
        </Button>
      </Fragment>
    );
  }
}

export default Apply