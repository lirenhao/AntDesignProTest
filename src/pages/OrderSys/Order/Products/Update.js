import React from 'react';
import { connect } from 'dva';
import { Modal, Form } from 'antd';
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
          .map(key => values[key])
          .reduce((a, b) => (b ? [...a, ...b] : a), []);
        const result = {
          productId: info.productId,
          productName: productInfo.productName,
          productPrice: info.productPrice,
          geoId: info.geoId,
          geoName: this.getGeoName(info.geoId),
          geoPrice: info.geoPrice,
          discountPrice: '优惠金额',
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
        <Form layout="horizontal" className={styles.stepForm}>
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="产品">
            {`${productInfo.productName}[${productPrice.productPrice}]`}
          </Form.Item>
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="区域">
            {`${this.getGeoName(info.geoId)}[${this.getGeoPrice(info.geoId).geoPrice}]`}
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
