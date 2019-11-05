import React from 'react';
import { Card, Table } from 'antd';
import Create from './Create';

class Products extends React.Component {
  columns = [
    { title: '产品ID', dataIndex: 'productId', key: 'productId' },
    { title: '产品金额', dataIndex: 'productAmt', key: 'productAmt' },
    { title: '区域ID', dataIndex: 'geoId', key: 'geoId' },
    { title: '区域价格', dataIndex: 'geoPrice', key: 'geoPrice' },
    { title: '优惠价格', dataIndex: 'discountPrice', key: 'discountPrice' },
    { title: '实际价格', dataIndex: 'productPrice', key: 'productPrice' },
    { title: '合计价格', dataIndex: 'productListPrice', key: 'productListPrice' },
  ];

  constructor(props) {
    super(props);
    this.state = {
      isCreateShow: false,
      products: [],
    };
  }

  handleAddModal = visible => {
    this.setState({ isCreateShow: visible });
  };

  handleAddForm = record => {
    const { products } = this.state;
    this.setState({ products: [...products, record] });
    this.handleAddModal(false);
  };

  expandedRowRender = record => {
    const columns = [
      { title: '属性ID', dataIndex: 'featureId', key: 'featureId' },
      { title: '属性价格', dataIndex: 'featurePrice', key: 'featurePrice' },
    ];
    return <Table columns={columns} dataSource={record.features} pagination={false} />;
  };

  render() {
    const { products, isCreateShow } = this.state;
    return (
      <Card
        title="已选服务"
        bordered={false}
        extra={<a onClick={() => this.handleAddModal(true)}>添加</a>}
      >
        <Table
          columns={this.columns}
          dataSource={products}
          rowKey="productId"
          pagination={false}
          expandedRowRender={this.expandedRowRender}
        />
        <Create
          title="添加服务"
          visible={isCreateShow}
          hideModal={() => this.handleAddModal(false)}
          handleFormSubmit={this.handleAddForm}
          info={{}}
        />
      </Card>
    );
  }
}

export default Products;
