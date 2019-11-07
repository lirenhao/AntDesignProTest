import React from 'react';
import { connect } from 'dva';
import { Modal, Steps } from 'antd';
import Query from './Query';
import Details from './Details';
import Price from './Price';

@connect(({ loading }) => ({
  loading: loading.models.order,
}))
class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      query: {},
      products: [],
      details: {},
      productPrice: {},
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

  handleQuery = query => {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/findProduct',
      payload: query,
      callback: products => {
        if (products && products.length > 0) {
          this.setState({
            query,
            products,
          });
          this.handleNext();
        }
      },
    });
  };

  handleDetails = details => {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/findPrice',
      payload: details,
      callback: productPrice => {
        if (productPrice) {
          this.setState({
            details,
            productPrice,
          });
          this.handleNext();
        }
      },
    });
  };

  handleSubmit = value => {
    const { handleFormSubmit } = this.props;
    this.setState({ current: 0 });
    handleFormSubmit(value);
  };

  render() {
    const { visible, hideModal } = this.props;
    const { current, query, products, details, productPrice } = this.state;

    return (
      <Modal
        width="60%"
        bodyStyle={{ padding: '32px 40px 48px' }}
        title="添加服务"
        maskClosable={false}
        visible={visible}
        onCancel={hideModal}
        footer={null}
      >
        <Steps current={current}>
          <Steps.Step title="选择服务类型" />
          <Steps.Step title="选择服务" />
          <Steps.Step title="选择服务属性" />
        </Steps>
        {current === 0 && <Query info={query} handleNext={this.handleQuery} />}
        {current === 1 && (
          <Details
            info={details}
            products={products}
            handleNext={this.handleDetails}
            handlePrev={this.handlePrev}
          />
        )}
        {current === 2 && (
          <Price
            info={{}}
            details={details}
            product={products.filter(item => item.productId === details.productId)[0] || {}}
            productPrice={productPrice}
            handleNext={this.handleSubmit}
            handlePrev={this.handlePrev}
          />
        )}
      </Modal>
    );
  }
}

export default Create;
