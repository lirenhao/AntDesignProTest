import React from 'react'
import {
  Modal,
  Form,
  Input,
} from 'antd'

@Form.create()
class Create extends React.Component {

  handleSubmit = e => {
    const { handleFormSubmit, form, info } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        handleFormSubmit({ ...info,  ...values});
        form.resetFields();
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      title,
      visible,
      hideModal,
      info,
      type,
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
        title={title}
        maskClosable={false}
        visible={visible}
        okText="提交"
        onOk={this.handleSubmit}
        onCancel={hideModal}
      >
        <Form>
          <Form.Item {...formItemLayout} label='名称'>
            {getFieldDecorator(`${type}Name`, {
              initialValue: info[`${type}Name`],
              rules: [
                {
                  required: true,
                  message: '请输入名称',
                },
              ],
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='描述'>
            {getFieldDecorator('description', {
              initialValue: info.description,
              rules: [
                {
                  required: true,
                  message: '请输入描述',
                },
              ],
              })(<Input.TextArea
                style={{ minHeight: 32 }}
                placeholder='请输入'
                rows={3}
              />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Create;