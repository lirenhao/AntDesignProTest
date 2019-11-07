import React from 'react';
import { Radio, Checkbox } from 'antd';

class Feature extends React.Component {
  handleRadio = e => {
    const { onChange } = this.props;
    const { value } = e.target;
    if (onChange) {
      onChange([value]);
    }
  };

  handleCheckbox = value => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const { feature, getFeatureName, value } = this.props;

    if (feature.isExclusive === '0') {
      const ids = (value || []).filter(item => feature.featureIds.indexOf(item) > -1) || [];
      return (
        <Radio.Group defaultValue={ids.length > 0 && ids[0]} onChange={this.handleRadio}>
          {feature.featureIds.map(featureId => (
            <Radio key={featureId} value={featureId}>
              {getFeatureName(featureId)}
            </Radio>
          ))}
        </Radio.Group>
      );
    }
    if (feature.isExclusive === '1')
      return (
        <Checkbox.Group defaultValue={value} onChange={this.handleCheckbox}>
          {feature.featureIds.map(featureId => (
            <Checkbox key={featureId} value={featureId}>
              {getFeatureName(featureId)}
            </Checkbox>
          ))}
        </Checkbox.Group>
      );
    return <div>没有该类型属性</div>;
  }
}

export default Feature;
