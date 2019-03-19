import React from 'react'
import {
  Modal,
  Form,
  Input,
  Select,
} from 'antd'

@Form.create()
class Create extends React.Component {

  handleSubmit = e => {
    const { handleFormSubmit, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        handleFormSubmit(values);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      visible,
      hideModal,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    }

    return (
      <Modal 
        width="60%"
        bodyStyle={{ padding: '32px 40px 48px' }}
        title='新建'
        maskClosable={false}
        visible={visible}
        okText="提交"
        onOk={this.handleSubmit}
        onCancel={hideModal}
      >
        <Form>
          <Form.Item {...formItemLayout} label="产品特征类型">
            {getFieldDecorator('productFeatureTypeId', {
              rules: [{ required: true, message: '请选择产品特征类型' }],
            })(
              <Select placeholder="请选择">
                <Select.Option value="1">产品质量</Select.Option>
                <Select.Option value="2">颜色</Select.Option>
                <Select.Option value="3">尺寸（指定数目）</Select.Option>
                <Select.Option value="4">大小</Select.Option>
                <Select.Option value="5">商标</Select.Option>
                <Select.Option value="6">软件特征</Select.Option>
                <Select.Option value="7">硬件特征</Select.Option>
                <Select.Option value="8">付款特征</Select.Option>
                <Select.Option value="9">其他特征</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='描述'>
            {getFieldDecorator('description', {
              rules: [
                {
                  required: true,
                  message: '请输入描述',
                },
              ],
            })(
              <Input.TextArea
                style={{ minHeight: 32 }}
                placeholder='请输入'
                rows={3}
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='uomId'>
            {getFieldDecorator('uomId', {
              rules: [
                {
                  required: true,
                  message: '请输入uomId',
                },
              ],
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='numberSpecified'>
            {getFieldDecorator('numberSpecified', {
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='defaultAmount'>
            {getFieldDecorator('defaultAmount', {
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='defaultSequenceNum'>
            {getFieldDecorator('defaultSequenceNum', {
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='ABBREV'>
            {getFieldDecorator('ABBREV', {
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='idCode'>
            {getFieldDecorator('idCode', {
              })(<Input placeholder='请输入' />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Create;