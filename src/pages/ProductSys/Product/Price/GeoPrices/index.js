import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import GeoPrice from './GeoPrice';

class GeoPrices extends React.Component {
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

  render() {
    const { product, value } = this.props;

    return (
      <React.Fragment>
        {product.geoIds.map(geoId => (
          <Card>
            <GeoPrice
              product={product}
              info={value.filter(item => item.geoId === geoId)[0] || {}}
            />
          </Card>
        ))}
      </React.Fragment>
    );
  }
}

export default GeoPrices;
