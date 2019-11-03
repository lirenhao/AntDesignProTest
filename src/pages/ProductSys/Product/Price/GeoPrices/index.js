import React from 'react';
import { connect } from 'dva';
import { Collapse } from 'antd';
import Header from './Header';
import GeoPrice from './GeoPrice';

const { Panel } = Collapse;

@connect(({ product }) => ({
  geo: product.dict.geo,
}))
class GeoPrices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || [],
    };
  }

  getGeoName = geoId => {
    const { geo } = this.props;
    const geos = geo.filter(item => item.geoId === geoId);
    return geos.length > 0 ? geos[0].geoName : geoId;
  };

  handleChange = geoId => geoPrice => {
    const { value } = this.state;
    const { onChange } = this.props;
    const newValue = value.map(item => (item.geoId === geoId ? geoPrice : item));
    this.setState({
      value: newValue,
    });
    if (onChange) {
      onChange(newValue);
    }
  };

  handleCopy = (geoIds, geoPrices) => {
    const { value } = this.state;
    const { onChange } = this.props;
    const newValue = value.map(item =>
      geoIds.indexOf(item.geoId) < 0
        ? item
        : {
            ...item,
            ...(geoPrices.filter(gp => item.geoId === gp.geoId)[0] || {}),
          }
    );
    this.setState({
      value: newValue,
    });
    if (onChange) {
      onChange(newValue);
    }
  };

  render() {
    const { product } = this.props;
    const { value } = this.state;

    return (
      <Collapse accordion>
        {product.geoIds.map(geoId => (
          <Panel
            key={geoId}
            header={
              <Header
                title={this.getGeoName(geoId)}
                value={value.filter(item => item.geoId === geoId)[0] || {}}
                geoId={geoId}
                onCopy={this.handleCopy}
                options={product.geoIds.map(id => ({ value: id, title: this.getGeoName(id) }))}
              />
            }
          >
            <GeoPrice
              onChange={this.handleChange(geoId)}
              product={product}
              value={value.filter(item => item.geoId === geoId)[0] || {}}
            />
          </Panel>
        ))}
      </Collapse>
    );
  }
}

export default GeoPrices;
