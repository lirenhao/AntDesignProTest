import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input } from 'antd';
import Feature from './Feature';

@connect(({ order, loading }) => ({
  geo: order.dict.geo,
  productFeatureType: order.dict.productFeatureType,
  productFeature: order.dict.productFeature,
  loading: loading.models.order,
}))
@Form.create()
class Update extends React.Component {
  getGeoName = geoId => {
    const { geo } = this.props;
    const geos = geo.filter(item => item.geoId === geoId);
    return geos.length > 0 ? geos[0].geoName : geoId;
  };

  getGeoPrice = geoId => {
    const { productPrice } = this.props;
    const geoPrices = (productPrice.geoPrices || []).filter(item => item.geoId === geoId);
    return geoPrices.length > 0 ? geoPrices[0] : {};
  };

  getFeatureTypeName = featureTypeId => {
    const { productFeatureType } = this.props;
    const featureTypes = productFeatureType.filter(
      item => item.productFeatureTypeId === featureTypeId
    );
    return featureTypes.length > 0 ? featureTypes[0].productFeatureTypeName : featureTypeId;
  };

  getFeatureName = featureId => {
    const { productFeature } = this.props;

    const features = productFeature.filter(item => item.productFeatureId === featureId);
    const featureName = features.length > 0 ? features[0].productFeatureName : featureId;

    return featureName;
  };

  getFeaturePrice = featureId => {
    const { info, productPrice } = this.props;

    const geoPrices = (productPrice.geoPrices || []).filter(item => item.geoId === info.geoId);
    const featurePrices = geoPrices.length > 0 ? geoPrices[0].featurePrices : {};
    const featurePrice = featurePrices.filter(item => item.featureId === featureId)[0] || {};

    return featurePrice.featurePrice;
  };

  handleSubmit = e => {
    const { handleFormSubmit, form, info, productInfo } = this.props;
    const { featurePrices } = this.getGeoPrice(info.geoId);
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const featureIds = Object.keys(values)
          .filter(key => key.indexOf('featureType') > -1)
          .map(key => values[key])
          .reduce((a, b) => (b ? [...a, ...b] : a), []);
        const result = {
          productId: info.productId,
          productName: productInfo.productName,
          productPrice: info.productPrice,
          geoId: info.geoId,
          geoName: this.getGeoName(info.geoId),
          geoPrice: info.geoPrice,
          discountPrice: values.discountPrice,
          features: featurePrices
            .filter(item => featureIds.indexOf(item.featureId) > -1)
            .map(item => ({
              ...item,
              featureName: this.getFeatureName(item.featureId),
            })),
        };
        handleFormSubmit(result);
        form.resetFields();
      }
    });
  };

  render() {
    const {
      visible,
      hideModal,
      form: { getFieldDecorator },
      info,
      productInfo,
      productPrice,
    } = this.props;
    const features = [
      ...(productInfo.fixFeatures || []),
      ...(productInfo.mustFeatures || []),
      ...(productInfo.optionFeatures || []),
    ];

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

    return (
      <Modal
        width="60%"
        bodyStyle={{ padding: '32px 40px 48px' }}
        title="修改服务"
        maskClosable={false}
        visible={visible}
        okText="提交"
        onOk={this.handleSubmit}
        onCancel={hideModal}
      >
        <Form layout="horizontal">
          <Form.Item {...formItemLayout} label="产品">
            {`${productInfo.productName}[${productPrice.productPrice}]`}
          </Form.Item>
          <Form.Item {...formItemLayout} label="区域">
            {`${this.getGeoName(info.geoId)}[${this.getGeoPrice(info.geoId).geoPrice}]`}
          </Form.Item>
          <Form.Item {...formItemLayout} label="优惠金额">
            {getFieldDecorator('discountPrice', {
              initialValue: info.discountPrice,
              rules: [
                {
                  required: true,
                  message: '请输入优惠金额',
                },
                {
                  pattern: /^(\d+)((?:\.\d{1,2})?)$/,
                  message: '请输入合法金额数字',
                },
              ],
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          {features.map((feature, index) => (
            <Form.Item
              {...formItemLayout}
              // eslint-disable-next-line react/no-array-index-key
              key={`${feature.featureTypeId}-${index}`}
              label={this.getFeatureTypeName(feature.featureTypeId)}
            >
              {getFieldDecorator(`featureType#${index}#${feature.featureTypeId}`, {
                initialValue: info.features
                  .map(item => item.featureId)
                  .filter(id => feature.featureIds.indexOf(id) > -1),
              })(
                <Feature
                  feature={feature}
                  getFeatureName={featureId =>
                    `${this.getFeatureName(featureId)}[${this.getFeaturePrice(featureId)}]`
                  }
                />
              )}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    );
  }
}

export default Update;
