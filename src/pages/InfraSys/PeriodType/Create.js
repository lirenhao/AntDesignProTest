import React from 'react'
import {
  Modal,
  Form,
  TreeSelect,
  Input,
  InputNumber,
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
      visible,
      hideModal,
      info,
      tree,
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
        title='新建'
        maskClosable={false}
        visible={visible}
        okText="提交"
        onOk={this.handleSubmit}
        onCancel={hideModal}
      >
        <Form>
          <Form.Item {...formItemLayout} label='所属父级'>
            {getFieldDecorator('parentTypeId', {
              initialValue: info.parentTypeId,
              })(
                <TreeSelect
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="请选择"
                  treeDefaultExpandAll
                  treeData={tree}
                />
              )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='名称'>
            {getFieldDecorator(`${type}Name`, {
              initialValue: info[`${type}Name`],
              rules: [
                {
                  required: true,
                  message: '请输入名称',
                },
              ],
            })(
              <Input placeholder='请输入' />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='长度'>
            {getFieldDecorator('periodLength', {
              initialValue: info.periodLength,
              rules: [
                {
                  required: true,
                  message: '请选择',
                },
              ],
              })(<InputNumber placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='计量单位标识'>
            {getFieldDecorator('uomId', {
              initialValue: info.uomId,
              rules: [
                {
                  required: true,
                  message: '请输入名称',
                },
              ],
            })(
              <Input placeholder='请输入' />
            )}
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