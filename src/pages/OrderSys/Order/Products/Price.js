import React from 'react';
import { connect } from 'dva';
import { Form, Button } from 'antd';
import Feature from './Feature';

import styles from './style.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ order, loading }) => ({
  geo: order.dict.geo,
  productFeatureType: order.dict.productFeatureType,
  productFeature: order.dict.productFeature,
  loading: loading.models.orderCreateProductDetails,
}))
@Form.create()
class Price extends React.PureComponent {
  getGeoName = geoId => {
    const { geo } = this.props;
    const geos = geo.filter(item => item.geoId === geoId);
    return geos.length > 0 ? geos[0].geoName : geoId;
  };

  getGeoPrice = geoId => {
    const { productPrice } = this.props;
    const geoPrices = productPrice.geoPrices.filter(item => item.geoId === geoId);
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
    const { productPrice, details } = this.props;

    const geoPrices = productPrice.geoPrices.filter(item => item.geoId === details.geoId);
    const featurePrices = geoPrices.length > 0 ? geoPrices[0].featurePrices : {};
    const featurePrice = featurePrices.filter(item => item.featureId === featureId)[0] || {};

    return featurePrice.featurePrice;
  };

  handleSubmit = e => {
    const { details, productPrice, form, handleNext } = this.props;
    const { featurePrices } = this.getGeoPrice(details.geoId);
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const featureIds = Object.keys(values)
          .map(key => values[key])
          .reduce((a, b) => (b ? [...a, ...b] : a), []);
        const geoPrices = productPrice.geoPrices.filter(gp => gp.geoId === details.geoId);
        const geoPrice = geoPrices.length > 0 ? geoPrices[0].geoPrice : 0;
        const result = {
          productId: details.productId,
          productName: details.productName,
          productPrice: productPrice.productPrice,
          geoId: details.geoId,
          geoName: details.geoName,
          geoPrice,
          discountPrice: '优惠金额',
          features: featurePrices
            .filter(item => featureIds.indexOf(item.featureId) > -1)
            .map(item => ({
              ...item,
              featureName: this.getFeatureName(item.featureId),
            })),
        };
        handleNext(result);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      product,
      details,
      productPrice,
      handlePrev,
      loading,
    } = this.props;
    const features = [...product.fixFeatures, ...product.mustFeatures, ...product.optionFeatures];

    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="产品">
          {`${product.productName}[${productPrice.productPrice}]`}
        </Form.Item>
        <Form.Item {...formItemLayout} className={styles.stepFormText} label="区域">
          {`${this.getGeoName(details.geoId)}[${this.getGeoPrice(details.geoId).geoPrice}]`}
        </Form.Item>
        {features.map(feature => (
          <Form.Item {...formItemLayout} label={this.getFeatureTypeName(feature.featureTypeId)}>
            {getFieldDecorator(`featureType#${feature.featureTypeId}`)(
              <Feature
                feature={feature}
                getFeatureName={featureId =>
                  `${this.getFeatureName(featureId)}[${this.getFeaturePrice(featureId)}]`
                }
              />
            )}
          </Form.Item>
        ))}
        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <Button type="primary" onClick={this.handleSubmit} loading={loading}>
            提 交
          </Button>
          <Button onClick={handlePrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Price;
