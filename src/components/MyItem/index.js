import React from 'react';
import PropsTypes from 'prop-types';
import { Form, TreeSelect, Input, Radio, Switch, DatePicker } from 'antd';
import moment from 'moment';

class MyItem extends React.Component {
  static defaultProps = {
    layout: {},
    type: 'input',
    rules: [],
  };

  static propsTypes = {
    layout: PropsTypes.object,
    getFieldDecorator: PropsTypes.func,
    type: PropsTypes.oneOf(['input', 'treeSelect', 'radio', 'switch', 'textArea', 'date']),
    name: PropsTypes.string,
    label: PropsTypes.string,
    value: PropsTypes.string,
    rules: PropsTypes.array,
  };

  renderInput = () => {
    const {
      layout,
      getFieldDecorator,
      name,
      label,
      value: initialValue,
      rules,
      placeholder,
    } = this.props;
    return (
      <Form.Item {...layout} label={label}>
        {getFieldDecorator(name, { initialValue, rules })(
          <Input placeholder={placeholder || '请输入'} />
        )}
      </Form.Item>
    );
  };

  renderTreeSelect = () => {
    const {
      layout,
      getFieldDecorator,
      name,
      label,
      value: initialValue,
      rules,
      placeholder,
      treeData,
    } = this.props;
    return (
      <Form.Item {...layout} label={label}>
        {getFieldDecorator(name, { initialValue, rules })(
          <TreeSelect
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder={placeholder || '请选择'}
            treeDefaultExpandAll
            treeData={treeData || []}
          />
        )}
      </Form.Item>
    );
  };

  renderRadio = () => {
    const {
      layout,
      getFieldDecorator,
      name,
      label,
      value: initialValue,
      rules,
      radios,
    } = this.props;
    return (
      <Form.Item {...layout} label={label}>
        {getFieldDecorator(name, { initialValue, rules })(
          <Radio.Group>
            {Object.keys(radios).map(key => (
              <Radio key={key} value={key}>
                {radios[key]}
              </Radio>
            ))}
          </Radio.Group>
        )}
      </Form.Item>
    );
  };

  renderSwitch = () => {
    const { layout, getFieldDecorator, name, label, value, rules } = this.props;
    return (
      <Form.Item {...layout} label={label}>
        {getFieldDecorator(name, { initialValue: !!value, valuePropName: 'checked', rules })(
          <Switch />
        )}
      </Form.Item>
    );
  };

  renderTextArea = () => {
    const {
      layout,
      getFieldDecorator,
      name,
      label,
      value: initialValue,
      rules,
      placeholder,
      rows,
    } = this.props;
    return (
      <Form.Item {...layout} label={label}>
        {getFieldDecorator(name, { initialValue, rules })(
          <Input.TextArea
            style={{ minHeight: 32 }}
            placeholder={placeholder || '请输入'}
            rows={rows || 3}
          />
        )}
      </Form.Item>
    );
  };

  renderDate = () => {
    const { layout, getFieldDecorator, name, label, value, rules, placeholder } = this.props;
    return (
      <Form.Item {...layout} label={label}>
        {getFieldDecorator(name, { initialValue: moment(value), rules })(
          <DatePicker style={{ width: '100%' }} placeholder={placeholder || '请选择'} />
        )}
      </Form.Item>
    );
  };

  render() {
    const { type } = this.props;
    if (type === 'input') return this.renderInput();
    if (type === 'treeSelect') return this.renderTreeSelect();
    if (type === 'radio') return this.renderRadio();
    if (type === 'switch') return this.renderSwitch();
    if (type === 'textArea') return this.renderTextArea();
    if (type === 'date') return this.renderDate();
    return this.renderInput();
  }
}

export default MyItem;
