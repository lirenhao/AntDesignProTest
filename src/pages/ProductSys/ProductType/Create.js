import React from 'react'
import {
  Modal,
  Form,
  Input,
  Radio,
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
          <Form.Item {...formItemLayout} label='产品类型名称'>
            {getFieldDecorator('productTypeName', {
              rules: [
                {
                  required: true,
                  message: '请输入产品类型名称',
                },
              ],
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='是否实物'>
            {getFieldDecorator('isPhysical', {
              rules: [
                {
                  required: true,
                  message: '请选择',
                },
              ],
              })(
                <Radio.Group>
                  <Radio value="0">否</Radio>
                  <Radio value="1">有</Radio>
                </Radio.Group>
              )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='是否虚拟'>
            {getFieldDecorator('isDigital', {
              rules: [
                {
                  required: true,
                  message: '请选择',
                },
              ],
              })(
                <Radio.Group>
                  <Radio value="0">否</Radio>
                  <Radio value="1">有</Radio>
                </Radio.Group>
              )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='是否有表'>
            {getFieldDecorator('hasTable', {
              rules: [
                {
                  required: true,
                  message: '请选择',
                },
              ],
              })(
                <Radio.Group>
                  <Radio value="0">无</Radio>
                  <Radio value="1">有</Radio>
                </Radio.Group>
              )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='描述'>
            {getFieldDecorator('descript', {
            })(
              <Input.TextArea
                style={{ minHeight: 32 }}
                placeholder='请输入'
                rows={3}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Create;