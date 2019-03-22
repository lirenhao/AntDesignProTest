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
  message,
  Popconfirm,
  Divider
} from 'antd'
import isEqual from 'lodash/isEqual'

@connect(({ productFeatureIactn, productFeature, productType }) => ({
  list: productFeatureIactn.list,
  feature: productFeature.data.list,
  iactnTypeTree: productType.tree.featureIactnType,
  featureIactnType: productType.featureIactnType,
}))
class Iactn extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      list: [],
      data: [],
    }
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.list, preState.list)) {
      return null;
    }
    return {
      list: nextProps.list
    };
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
        type: 'featureIactnType', 
        id: 'productFeatureIactnTypeId', 
        pId: 'parentTypeId', 
        title: 'description',
      },
    });
    const { productId } = this.props;
    dispatch({
      type: 'productFeatureIactn/fetch',
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
      productFeatureIdTo: '',
      productFeatureIactnTypeId: '',
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
        type: 'productFeatureIactn/remove',
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
    if (!target.productFeatureId || !target.productFeatureIdTo || !target.productFeatureIactnTypeId) {
      message.error('请填写完整特征信息');
      e.target.focus();
      this.setState({
        loading: false,
      });
      return;
    }
    delete target.isNew
    delete target.editable
    const { dispatch } = this.props;
    target.key = `${target.productFeatureId}-${target.productFeatureIdTo}`;
    dispatch({
      type: 'productFeatureIactn/save',
      payload: target,
      callback: () => {
        this.setState({
          loading: false,
          data: [],
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
        title: '源特征',
        dataIndex: 'productFeatureId',
        key: 'productFeatureId',
        render: (text, record) => {
          const { feature } = this.props
          if (record.editable) {
            return (
              <Select 
                value={text} 
                onChange={value => this.handleSelectFieldChange(value, 'productFeatureId', record.key)}
                placeholder="请选择产品特征" 
                style={{ width: '100%' }}
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
        title: '目标特征',
        dataIndex: 'productFeatureIdTo',
        key: 'productFeatureIdTo',
        render: (text, record) => {
          const { feature } = this.props
          if (record.editable) {
            return (
              <Select 
                value={text} 
                onChange={value => this.handleSelectFieldChange(value, 'productFeatureIdTo', record.key)}
                placeholder="请选择产品特征" 
                style={{ width: '100%' }}
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
        title: '特征类型',
        dataIndex: 'productFeatureIactnTypeId',
        key: 'productFeatureIactnTypeId',
        render: (text, record) => {
          const { iactnTypeTree, featureIactnType } = this.props
          if (record.editable) {
            return (
              <TreeSelect
                value={text}
                onChange={e => this.handleSelectFieldChange(e, 'productFeatureIactnTypeId', record.key)}
                treeDefaultExpandAll
                treeData={iactnTypeTree[0].children}
                placeholder="请选择特征类型"
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                style={{ width: '100%' }}
              />
            );
          }
          return featureIactnType[text] ? featureIactnType[text].description : null;
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

    const { loading, list, data } = this.state;

    return (
      <Fragment>
        <Table
          loading={loading}
          columns={columns}
          dataSource={[...list, ...data]}
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

export default Iactn;
