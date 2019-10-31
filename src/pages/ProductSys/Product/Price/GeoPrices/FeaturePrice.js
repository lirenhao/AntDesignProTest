import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Input, Form } from 'antd';

@connect(({ product }) => ({
  productFeature: product.dict.productFeature,
}))
class FeaturePrice extends React.Component {
  static propTypes = {
    value: PropTypes.array,
  };

  static defaultProps = {
    value: [],
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  getFeatureName = id => {
    const { productFeature } = this.props;
    const list = productFeature.filter(item => item.productFeatureId === id);
    return list.length > 0 ? list[0].productFeatureName : id;
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
    const { featureIds } = this.props;

    return (
      <React.Fragment>
        {featureIds.map(id => (
          <Form.Item {...formItemLayout} label={`${this.getFeatureName(id)}价格`}>
            <Input prefix="￥" suffix="RMB" />
          </Form.Item>
        ))}
      </React.Fragment>
    );
  }
}

export default FeaturePrice;
