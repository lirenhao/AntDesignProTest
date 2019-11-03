import React from 'react';
import { Select, Divider, Button } from 'antd';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geoIds: [],
    };
  }

  onClickHandler = e => {
    e.stopPropagation();
  };

  handleChange = geoIds => {
    this.setState({
      geoIds,
    });
  };

  handleCopy = () => {
    const { value, onCopy } = this.props;
    const { geoIds } = this.state;
    onCopy(
      geoIds,
      geoIds.map(geoId => ({
        ...value,
        geoId,
      }))
    );
  };

  render() {
    const { title, value, options, geoId } = this.props;
    const { geoIds } = this.state;
    const amount = value.featurePrices
      .map(item => item.featurePrice)
      .reduce((a, b) => a + parseFloat(b), parseFloat(value.geoPrice));
    return (
      <div onClick={this.onClickHandler}>
        {`${title}   总价格:${amount}`}
        <Select
          allowClear
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="请选择要拷贝的区域"
          defaultValue={geoIds}
          onChange={this.handleChange}
          dropdownRender={menu => (
            <div>
              {menu}
              <Divider style={{ margin: '4px 0' }} />
              <div style={{ padding: '4px 8px', cursor: 'pointer' }}>确定</div>
            </div>
          )}
        >
          {options
            .filter(option => option.value !== geoId)
            .map(option => (
              <Select.Option key={option.value}>{option.title}</Select.Option>
            ))}
        </Select>
        <Button onClick={this.handleCopy}>复制</Button>
      </div>
    );
  }
}

export default Header;
