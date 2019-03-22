import React, {
  PureComponent,
  Fragment
} from 'react'
import { connect } from 'dva'
import {
  Table,
  Button,
  Select,
  DatePicker,
  InputNumber,
  message,
  Popconfirm,
  Divider,
} from 'antd'
import moment from 'moment'

@connect(({ productPriceComp, productType }) => ({
  list: productPriceComp.list,
  priceType: productType.priceType,
  pricePurpose: productType.pricePurpose,
}))
class Price extends PureComponent {
  index = 0;

  state = {
    loading: false,
    data: {},
  }

  componentDidMount() {
    const { dispatch, productId } = this.props;
    dispatch({
      type: 'productPriceComp/fetch',
      payload: productId,
    });
  }

  newRow = () => {
    const { productId } = this.props;
    const { data } = this.state;
    const key = `new-${this.index}`;
    const target = {
      productPriceComponentId: key,
      productId,
      productPriceTypeId: '',
      productPricePurposeId: '',
      fromDate: '',
      thruDate: '',
      price: '',
      percent: '',
      descript: '',
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
    const target = list.filter(item => item.productPriceComponentId === key)[0] || {};
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
        type: 'productPriceComp/remove',
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
    if (!target.productPriceTypeId || !target.productPricePurposeId || 
      !target.fromDate || !target.thruDate || !target.price || !target.percent) {
      message.error('请填写完整产品定价信息');
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
    dispatch({
      type: 'productPriceComp/save',
      payload: target,
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
    if (!target.productPriceTypeId || !target.productPricePurposeId || 
      !target.fromDate || !target.thruDate || !target.price || !target.percent) {
      message.error('请填写完整产品定价信息');
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
    dispatch({
      type: 'productPriceComp/update',
      payload: { key, payload: target },
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
        title: '产品价格类型',
        dataIndex: 'productPriceTypeId',
        key: 'productPriceTypeId',
        render: (text, record) => {
          const { priceType } = this.props
          if (record.editable) {
            return (
              <Select 
                value={text} 
                onChange={value => this.handleSelectFieldChange(value, 'productPriceTypeId', record.productPriceComponentId)}
                placeholder="产品价格类型" 
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                style={{ width: 120 }}
              >
                {Object.keys(priceType).map(key => (
                  <Select.Option key={priceType[key].productPriceTypeId}>{priceType[key].description}</Select.Option>
                ))}
              </Select>
            );
          }
          return priceType[text].description;
        },
      },
      {
        title: '产品价格用途',
        dataIndex: 'productPricePurposeId',
        key: 'productPricePurposeId',
        render: (text, record) => {
          const { pricePurpose } = this.props
          if (record.editable) {
            return (
              <Select 
                value={text} 
                onChange={value => this.handleSelectFieldChange(value, 'productPricePurposeId', record.productPriceComponentId)}
                placeholder="产品价格类型" 
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                style={{ width: 120 }}
              >
                {Object.keys(pricePurpose).map(key => (
                  <Select.Option key={pricePurpose[key].productPricePurposeId}>
                    {pricePurpose[key].description}
                  </Select.Option>
                ))}
              </Select>
            );
          }
          return pricePurpose[text].description;
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
                onChange={e => this.handleSelectFieldChange(e.format('YYYY-MM-DD'), 'fromDate', record.productPriceComponentId)}
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
                onChange={e => this.handleSelectFieldChange(e.format('YYYY-MM-DD'), 'thruDate', record.productPriceComponentId)}
                placeholder='结束日期' 
              />
            );
          }
          return text;
        },
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        render: (text, record) => {
          if (record.editable) {
            return (
              <InputNumber
                value={text}
                onChange={e => this.handleSelectFieldChange(e, 'price', record.productPriceComponentId)}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                placeholder='价格' 
              />
            );
          }
          return `$ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
      },
      {
        title: '百分比',
        dataIndex: 'percent',
        key: 'percent',
        render: (text, record) => {
          if (record.editable) {
            return (
              <InputNumber
                value={text}
                min={0}
                max={100}
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
                onChange={e => this.handleSelectFieldChange(e, 'percent', record.productPriceComponentId)}
                placeholder='百分比' 
              />
            );
          }
          return `${text}%`;
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
                  <a onClick={e => this.saveRow(e, record.productPriceComponentId)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.productPriceComponentId)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.updateRow(e, record.productPriceComponentId)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.productPriceComponentId)}>取消</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.editRow(e, record.productPriceComponentId)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.productPriceComponentId)}>
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
      ...data[item.productPriceComponentId],
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
          rowKey={record => record.productPriceComponentId}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newRow}
          icon="plus"
        >
          添加产品定价
        </Button>
      </Fragment>
    );
  }
}

export default Price