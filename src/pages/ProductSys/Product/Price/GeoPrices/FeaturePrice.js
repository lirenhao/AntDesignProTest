import React from 'react';
import { connect } from 'dva';
import { Input, Form } from 'antd';

@connect(({ product }) => ({
  productFeature: product.dict.productFeature,
}))
class FeaturePrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || [],
    };
  }

  getFeatureName = id => {
    const { productFeature } = this.props;
    const list = productFeature.filter(item => item.productFeatureId === id);
    return list.length > 0 ? list[0].productFeatureName : id;
  };

  featurePriceChange = e => {
    const featurePrice = e.target.value;
    const pattern = /^(\d+)((?:\.\d{1,2})?)$/;
    if (pattern.test(featurePrice)) {
      const { value } = this.state;
      const { onChange } = this.props;
      this.setState({
        value: { ...value, featurePrice },
      });
      if (onChange) {
        onChange({ ...value, featurePrice });
      }
    }
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    const { value } = this.state;

    return (
      <React.Fragment>
        <Form.Item
          {...formItemLayout}
          label={`${this.getFeatureName(value.featureId)}价格`}
          help={() => {}}
        >
          <Input
            style={{ width: 200 }}
            prefix="￥"
            suffix="RMB"
            onChange={this.featurePriceChange}
            value={value.featurePrice}
          />
        </Form.Item>
      </React.Fragment>
    );
  }
}

export default FeaturePrice;
