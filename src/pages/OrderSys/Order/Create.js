import React from 'react';
import { connect } from 'dva';
import { Drawer, Steps, Button } from 'antd';
import Products from './Products';

@connect(({ order, loading }) => ({
  productType: order.dict.productType,
  productCategoty: order.dict.productCategoty,
  geo: order.dict.geo,
  loading: loading.models.order,
}))
class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      products: [],
    };
  }

  handleNext = () => {
    const { current } = this.state;
    this.setState({ current: current + 1 });
  };

  handlePrev = () => {
    const { current } = this.state;
    this.setState({ current: current - 1 });
  };

  handleProducts = product => {
    const { products } = this.state;
    this.setState({ products: [...products, product] });
  };

  handleSubmit = e => {
    const { handleFormSubmit, form, info } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        handleFormSubmit({
          ...info,
          ...values,
          releaseDate: values.releaseDate.format('YYYY-MM-DD'),
          salesDiscontinuationDate: values.salesDiscontinuationDate.format('YYYY-MM-DD'),
        });
        form.resetFields();
      }
    });
  };

  render() {
    const { title, visible, hideModal, loading } = this.props;

    const { current } = this.state;

    return (
      <Drawer
        title={title}
        width="70%"
        destroyOnClose
        maskClosable={false}
        visible={visible}
        onClose={hideModal}
      >
        <Steps current={current}>
          <Steps.Step title="选择订单服务" />
          <Steps.Step title="输入订单信息" />
          <Steps.Step title="完成" />
        </Steps>
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
          {current === 0 && <Products handleFormSubmit={console.log} />}
          {current === 1 && <div>分步表单</div>}
          {current === 2 && <div>分步表单</div>}
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
          <Button style={{ marginRight: 8 }} onClick={hideModal}>
            取消
          </Button>
          {current < 2 && (
            <Button type="primary" onClick={() => this.handleNext()}>
              下一步
            </Button>
          )}
          {current === 2 && (
            <Button type="primary" onClick={this.handleSubmit} loading={loading}>
              提交
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.handlePrev()}>
              上一步
            </Button>
          )}
        </div>
      </Drawer>
    );
  }
}

export default Create;
