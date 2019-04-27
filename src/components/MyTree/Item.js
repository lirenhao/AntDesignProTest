import React from 'react'
import PropsTypes from 'prop-types'
import {
  Form,
  TreeSelect,
  Input,
  Radio,
  Button,
} from 'antd'

class Item extends React.Component {

  static defaultProps = {
    layout: {},
    type: 'input',
    rules: [],
  }

  static propsTypes = {
    layout: PropsTypes.object,
    getFieldDecorator: PropsTypes.func,
    type: PropsTypes.oneOf(['input', 'treeSelect', 'radio', 'textArea']),
    name: PropsTypes.string,
    label: PropsTypes.string,
    value: PropsTypes.string,
    rules: PropsTypes.array,
  }

  renderInput = () => {
    const { layout, getFieldDecorator, name, label, value: initialValue, rules, placeholder } = this.props
    return (
      <Form.Item {...layout} label={label} >
        {getFieldDecorator(name, { initialValue, rules })(
          <Input placeholder={placeholder || '请输入'} />
        )}
      </Form.Item>
    )
  }

  renderTreeSelect = () => {
    const { layout, getFieldDecorator, name, label, value: initialValue, rules, placeholder, treeData } = this.props
    return (
      <Form.Item {...layout} label={label} >
        {getFieldDecorator(name, { initialValue, rules })(
          <TreeSelect
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder={placeholder || '请选择'}
            treeDefaultExpandAll
            treeData={treeData || []}
          />
        )}
      </Form.Item>
    )
  }

  renderRadio = () => {
    const { layout, getFieldDecorator, name, label, value: initialValue, rules, radios } = this.props
    return (
      <Form.Item {...layout} label={label} >
        {getFieldDecorator(name, { initialValue, rules })(
          <Radio.Group>
            {Object.keys(radios).map(key => (<Radio value={key}>{radios[key]}</Radio>))}
          </Radio.Group>
        )}
      </Form.Item>
    )
  }

  renderTextArea = () => {
    const { layout, getFieldDecorator, name, label, value: initialValue, rules, placeholder, rows } = this.props
    return (
      <Form.Item {...layout} label={label} >
        {getFieldDecorator(name, { initialValue, rules })(
          <Input.TextArea
            style={{ minHeight: 32 }}
            placeholder={placeholder || '请输入'}
            rows={rows || 3}
          />
        )}
      </Form.Item>
    )
  }

  render() {
    const { type } = this.props
    if(type === 'input') return this.renderInput()
    if(type === 'treeSelect') return this.renderTreeSelect()
    if(type === 'radio') return this.renderRadio()
    if(type === 'textArea') return this.renderTextArea()
    return this.renderInput()
  }
}

export default Item