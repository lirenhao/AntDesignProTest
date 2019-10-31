import React from 'react';
import { Card } from 'antd';
import GeoPrice from './GeoPrice';

class GeoPrices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || [],
    };
  }

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

  render() {
    const { product } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        {product.geoIds.map(geoId => (
          <Card>
            <GeoPrice
              onChange={this.handleChange(geoId)}
              product={product}
              value={value.filter(item => item.geoId === geoId)[0] || {}}
            />
          </Card>
        ))}
      </React.Fragment>
    );
  }
}

export default GeoPrices;
