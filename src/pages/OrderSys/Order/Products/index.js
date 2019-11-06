import React from 'react';
import { Card, Table, Divider, Button } from 'antd';
import Create from './Create';

class Products extends React.Component {
  columns = [
    { title: '产品', dataIndex: 'productName', key: 'productId' },
    { title: '产品金额', dataIndex: 'productPrice', key: 'productPrice' },
    { title: '区域', dataIndex: 'geoName', key: 'geoId' },
    { title: '区域价格', dataIndex: 'geoPrice', key: 'geoPrice' },
    { title: '优惠价格', dataIndex: 'discountPrice', key: 'discountPrice' },
    { title: '合计价格', dataIndex: 'productListPrice', key: 'productListPrice' },
    {
      title: '操作',
      render: (_, record) => (
        <React.Fragment>
          <a onClick={() => this.handleRemove(record)}>删除</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleUpdate(record)}>修改</a>
        </React.Fragment>
      ),
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      isCreateShow: false,
      products: props.products || [],
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
      { title: '属性', dataIndex: 'featureName', key: 'featureId' },
      { title: '属性价格', dataIndex: 'featurePrice', key: 'featurePrice' },
    ];
    return <Table columns={columns} dataSource={record.features} pagination={false} />;
  };

  render() {
    const { handleNext } = this.props;
    const { products, isCreateShow } = this.state;
    return (
      <React.Fragment>
        <div
          style={{
            marginTop: '16px',
            border: '1px dashed #e9e9e9',
            borderRadius: '6px',
            backgroundColor: '#fafafa',
            minHeight: '200px',
            textAlign: 'center',
          }}
        >
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
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px',
          }}
        >
          <Button type="primary" onClick={() => handleNext(products)}>
            下一步
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default Products;
