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

@connect(({ productFeatureIactn, productFeature, type: sysType }) => ({
  list: productFeatureIactn.list,
  feature: productFeature.data.list,
  iactnTypeTree: sysType.tree.productFeatureIactnType,
  featureIactnType: sysType.productFeatureIactnType,
}))
class Iactn extends PureComponent {
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
      type: 'type/tree',
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

  newRow = () => {
    const { productId } = this.props;
    const { data } = this.state;
    const key = `new-${this.index}`;
    const target = {
      key: `new-${this.index}`,
      productId,
      productFeatureId: '',
      productFeatureIdTo: '',
      productFeatureIactnTypeId: '',
      editable: true,
      isNew: true,
    };
    this.index += 1;
    this.setState({ data: {...data, [key]: target} });
  }

  remove(key) {
    const { data } = this.state;
    if(key.split('-')[0] === 'new'){
      delete data[key];
      this.setState({ data: {...data}, });
    } else {
      const { dispatch, productId } = this.props;
      dispatch({
        type: 'productFeatureIactn/remove',
        payload: {
          key,
          productId,
        },
        callback: () => {
          delete data[key];
          this.setState({ data: {...data}, });
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
    const { data } = this.state
    const target = data[key] ? {...data[key]} : {};
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
    target.key = `${target.productFeatureId}-${target.productFeatureIdTo}-${target.productId}`;
    dispatch({
      type: 'productFeatureIactn/save',
      payload: target,
      callback: () => {
        this.setState({
          loading: false,
          data: Object.keys(data).filter(k => k !== key).map(k => data[k]),
        });
      }
    });
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
                value={text === '' ? undefined : text} 
                onChange={value => this.handleSelectFieldChange(value, 'productFeatureId', record.key)}
                placeholder="请选择产品特征" 
                style={{ width: '100%' }}
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
        title: '目标特征',
        dataIndex: 'productFeatureIdTo',
        key: 'productFeatureIdTo',
        render: (text, record) => {
          const { feature } = this.props
          if (record.editable) {
            return (
              <Select 
                value={text === '' ? undefined : text} 
                onChange={value => this.handleSelectFieldChange(value, 'productFeatureIdTo', record.key)}
                placeholder="请选择产品特征" 
                style={{ width: '100%' }}
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
        title: '特征互作用类型',
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
                placeholder="请选择特征互作用类型"
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

    const { list } = this.props;
    const { loading, data } = this.state;

    const dataSource = list.map(item => ({
      ...item,
      ...data[`${item.productFeatureId}-${item.productFeatureIdTo}`],
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
          rowKey={record => `${record.productFeatureId}-${record.productFeatureIdTo}-${record.key}`}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newRow}
          icon="plus"
        >
          添加特征互作用
        </Button>
      </Fragment>
    );
  }
}

export default Iactn