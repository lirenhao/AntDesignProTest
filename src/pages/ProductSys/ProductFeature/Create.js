import React from 'react'
import { connect } from 'dva'
import {
  Modal,
  Form,
  Input,
  Select,
} from 'antd'

@connect(({ productType }) => ({
  featureType: productType.featureType,
}))
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
      featureType,
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
                {Object.keys(featureType).map(key => (
                  <Select.Option value={key}>{featureType[key].description}</Select.Option>
                ))}
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