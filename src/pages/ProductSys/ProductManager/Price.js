import React, {
  PureComponent,
  Fragment
} from 'react'
import { connect } from 'dva'
import {
  Table,
  Button,
  message,
  Popconfirm,
  Divider,
} from 'antd'
import Create from './Price/Create'

@connect(({ productPriceComp, type: sysType, productFeature, productCategory, loading }) => ({
  list: productPriceComp.list,
  priceType: sysType.productPriceType,
  pricePurpose: sysType.productPricePurpose,
  feature: productFeature.data.list,
  category: productCategory.data.list,
  loading: loading.models.productPriceComp,
}))
class Price extends PureComponent {

  state = {
    isCreateShow: false,
    isUpdateShow: false,
    info: {},
  }

  componentDidMount() {
    const { dispatch, productId } = this.props;
    dispatch({
      type: 'productFeature/findAll',
      payload: {
        type: 'feature',
      }
    });
    dispatch({
      type: 'productCategory/findAll',
      payload: {
        type: 'category',
      }
    });
    dispatch({
      type: 'productPriceComp/fetch',
      payload: productId,
    });
  }

  handleCreateForm = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productPriceComp/save',
      payload: {
        ...record,
        fromDate: record.fromDate.format('YYYY-MM-DD'),
        thruDate: record.thruDate.format('YYYY-MM-DD'),
      },
      callback: () => {
        this.setState({isCreateShow: false})
        message.success('新增成功')
      },
    });
  }

  handleUpdate = (record) => {
    this.setState({ isUpdateShow: true, info: record})
  }

  handleUpdateForm = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productPriceComp/update',
      payload: {
        key: record.productPriceComponentId,
        payload: {
          ...record,
          fromDate: record.fromDate.format('YYYY-MM-DD'),
          thruDate: record.thruDate.format('YYYY-MM-DD'),
        },
      },
      callback: () => {
        this.setState({isUpdateShow: false})
        message.success('修改成功')
      },
    });
  }

  handleRemove(key) {
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

  render() {
    const columns = [
      {
        title: '产品价格类型',
        dataIndex: 'productPriceTypeId',
        key: 'productPriceTypeId',
        render: (text) => {
          const { priceType } = this.props
          return priceType[text].description;
        },
      },
      {
        title: '产品价格用途',
        dataIndex: 'productPricePurposeId',
        key: 'productPricePurposeId',
        render: (text) => {
          const { pricePurpose } = this.props
          return pricePurpose[text].description;
        },
      },
      {
        title: '特征标识定价',
        dataIndex: 'productFeatureId',
        key: 'productFeatureId',
        render: text => {
          const { feature } = this.props
          return text.map(key => feature.filter(i => i.productFeatureId === key)[0] || {})
            .map(i => i.description)
            .reduce((a, b) => a === '' ? b :`${a}/${b}`, '')
        }
      },
      {
        title: '类别标识定价',
        dataIndex: 'productCategoryId',
        key: 'productCategoryId',
        render: text => {
          const { category } = this.props
          const data = category.filter(i => i.productCategoryId === text)[0] || {}
          return data.categoryName
        }
      },
      {
        title: '合同标识定价',
        dataIndex: 'agreementId',
        key: 'agreementId',
      },
      {
        title: '协议标识定价',
        dataIndex: 'agreementItemSeqId',
        key: 'agreementItemSeqId',
      },
      {
        title: '货币标识',
        dataIndex: 'uomId',
        key: 'uomId',
      },
      {
        title: '销售类型标识',
        dataIndex: 'saleTypeId',
        key: 'saleTypeId',
      },
      {
        title: '订购价值标识',
        dataIndex: 'orderValueId',
        key: 'orderValueId',
      },
      {
        title: '数量超出标识',
        dataIndex: 'quantityBreakId',
        key: 'quantityBreakId',
      },
      {
        title: '区域标识定价',
        dataIndex: 'geoId',
        key: 'geoId',
        render: text => text.reduce((a, b) => a === '' ? b :`${a}/${b}`, '')
      },
      {
        title: '开始日期',
        dataIndex: 'fromDate',
        key: 'fromDate',
      },
      {
        title: '结束日期',
        dataIndex: 'thruDate',
        key: 'thruDate',
      },
      {
        title: '具体价格',
        dataIndex: 'price',
        key: 'price',
        render: text => `$ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      },
      {
        title: '具体百分比',
        dataIndex: 'percent',
        key: 'percent',
        render: text => `${text}%`,
      },
      {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 120,
        render: (text, record) => {
          return (
            <span>
              <a onClick={() => this.handleUpdate(record)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.handleRemove(record.productPriceComponentId)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    const {
      list,
      productId,
      productCategoryId,
    } = this.props;
    const {
      loading,
      isCreateShow,
      isUpdateShow,
      info,
    } = this.state;

    return (
      <Fragment>
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={() => this.setState({ isCreateShow: true })}
          icon="plus"
        >
          添加产品定价
        </Button>
        <Table
          loading={loading}
          columns={columns}
          dataSource={list}
          pagination={false}
          rowKey={record => record.productPriceComponentId}
          scroll={{ x: 1800 }}
        />
        <Create 
          visible={isCreateShow} 
          hideModal={() => this.setState({ isCreateShow: false })} 
          handleFormSubmit={this.handleCreateForm}
          title="新建定价"
          info={{productId, productCategoryId}}
        />
        <Create 
          visible={isUpdateShow} 
          hideModal={() => this.setState({ isUpdateShow: false })} 
          handleFormSubmit={this.handleUpdateForm}
          title="修改定价"
          info={info}
        />
      </Fragment>
    );
  }
}

export default Price