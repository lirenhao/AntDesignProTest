import React from 'react';
import { Radio, Checkbox } from 'antd';

class Feature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || [],
    };
  }

  handleRadio = e => {
    const { onChange } = this.props;
    const { value } = e.target;
    this.setState({
      value: [value],
    });
    if (onChange) {
      onChange([value]);
    }
  };

  handleCheckbox = value => {
    const { onChange } = this.props;
    this.setState({ value });
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const { feature, getFeatureName } = this.props;
    const { value } = this.state;

    if (feature.isExclusive === '0')
      return (
        <Radio.Group defaultValue={value[0]} onChange={this.handleRadio}>
          {feature.featureIds.map(featureId => (
            <Radio value={featureId}>{getFeatureName(featureId)}</Radio>
          ))}
        </Radio.Group>
      );
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
