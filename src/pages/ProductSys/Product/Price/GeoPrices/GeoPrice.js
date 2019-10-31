import React from 'react';
import { connect } from 'dva';
import { Card, List, Input, Form } from 'antd';
import FeaturePrice from './FeaturePrice';

@connect(({ product }) => ({
  geo: product.dict.geo,
  productFeatureType: product.dict.productFeatureType,
  productFeature: product.dict.productFeature,
}))
class GeoPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || {},
    };
  }

  getGeoName = geoId => {
    const { geo } = this.props;
    const geos = geo.filter(item => item.geoId === geoId);
    return geos.length > 0 ? geos[0].geoName : geoId;
  };

  getFeatureTypeName = typeId => {
    const { productFeatureType } = this.props;
    const types = productFeatureType.filter(item => item.productFeatureTypeId === typeId);
    return types.length > 0 ? types[0].productFeatureTypeName : typeId;
  };

  geoPriceChange = e => {
    const { value } = this.state;
    const { onChange } = this.props;
    this.setState({
      value: { ...value, geoPrice: e.target.value },
    });
    if (onChange) {
      onChange({ ...value, geoPrice: e.target.value });
    }
  };

  featurePriceChange = featurePrice => {
    const { value } = this.state;
    const { onChange } = this.props;
    const featurePrices = value.featurePrices.map(fp =>
      fp.featureId === featurePrice.featureId ? featurePrice : fp
    );
    this.setState({
      value: { ...value, featurePrices },
    });
    if (onChange) {
      onChange({ ...value, featurePrices });
    }
  };

  render() {
    const { product } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <Form.Item label={`${this.getGeoName(value.geoId)}价格`} colon={false}>
          <Input
            placeholder="请输入区域价格"
            style={{ width: 200 }}
            prefix="￥"
            suffix="RMB"
            onChange={this.geoPriceChange}
            value={value.geoPrice}
          />
        </Form.Item>
        <Card size="small" type="inner" title="固定属性">
          <List
            itemLayout="horizontal"
            dataSource={product.fixFeatures.map(item => ({
              ...item,
              title: this.getFeatureTypeName(item.featureTypeId),
            }))}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={item.featureIds.map(id => (
                    <FeaturePrice
                      value={value.featurePrices.filter(fp => fp.featureId === id)[0] || {}}
                      onChange={this.featurePriceChange}
                    />
                  ))}
                />
              </List.Item>
            )}
          />
        </Card>
        <Card size="small" type="inner" title="必须属性">
          <List
            itemLayout="horizontal"
            dataSource={product.mustFeatures.map(item => ({
              ...item,
              title: this.getFeatureTypeName(item.featureTypeId),
            }))}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={item.featureIds.map(id => (
                    <FeaturePrice
                      value={value.featurePrices.filter(fp => fp.featureId === id)[0] || {}}
                      onChange={this.featurePriceChange}
                    />
                  ))}
                />
              </List.Item>
            )}
          />
        </Card>
        <Card size="small" type="inner" title="可选属性">
          <List
            itemLayout="horizontal"
            dataSource={product.optionFeatures.map(item => ({
              ...item,
              title: this.getFeatureTypeName(item.featureTypeId),
            }))}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={item.featureIds.map(id => (
                    <FeaturePrice
                      value={value.featurePrices.filter(fp => fp.featureId === id)[0] || {}}
                      onChange={this.featurePriceChange}
                    />
                  ))}
                />
              </List.Item>
            )}
          />
        </Card>
      </React.Fragment>
    );
  }
}

export default GeoPrice;
