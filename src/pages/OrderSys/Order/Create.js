import React from 'react';
import { connect } from 'dva';
import { Drawer, Steps } from 'antd';
import Products from './Products';
import BasicInfo from './BasicInfo';
import Result from './Result';

@connect(({ order }) => ({
  productType: order.dict.productType,
  productCategoty: order.dict.productCategoty,
  geo: order.dict.geo,
}))
class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      info: props.info || {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.info.orderId === prevState.info.orderId) {
      return null;
    }
    return {
      current: 0,
      info: nextProps.info,
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

  handleProducts = products => {
    const { info } = this.state;
    this.setState({
      info: {
        ...info,
        products,
      },
    });
    this.handleNext();
  };

  handleBasicInfo = basicInfo => {
    const { info } = this.state;
    this.setState({
      info: {
        ...info,
        ...basicInfo,
      },
    });
    this.handleNext();
  };

  handleSubmit = value => {
    const { handleFormSubmit } = this.props;
    handleFormSubmit(value);
  };

  render() {
    const { title, visible, hideModal } = this.props;

    const { current, info } = this.state;

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
        {current === 0 && <Products products={info.products} handleNext={this.handleProducts} />}
        {current === 1 && (
          <BasicInfo info={info} handleNext={this.handleBasicInfo} handlePrev={this.handlePrev} />
        )}
        {current === 2 && (
          <Result info={info} handleNext={this.handleSubmit} handlePrev={this.handlePrev} />
        )}
      </Drawer>
    );
  }
}

export default Create;
