import React from 'react'
import { connect } from 'dva'
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
} from 'antd'

@connect(({ type: sysType }) => ({
  type: sysType.quantityBreakType,
}))
@Form.create()
class Create extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'type/find',
      payload: {
        type: 'quantityBreakType',
      }
    });
  }

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
      info,
      visible,
      hideModal,
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
          <Form.Item {...formItemLayout} label='数量超出名称'>
            {getFieldDecorator('quantityBreakName', {
              initialValue: info.quantityBreakName,
              rules: [
                {
                  required: true,
                  message: '请输入数量超出名称',
                },
              ],
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="数量超出类型">
            {getFieldDecorator('quantityBreakTypeId', {
              initialValue: info.quantityBreakTypeId,
              rules: [{ required: true, message: '请选择数量超出类型' }],
            })(
              <Select placeholder="请选择">
                {Object.keys(type).map(key => (
                  <Select.Option value={key}>{type[key].quantityBreakTypeName}</Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='开始数量'>
            {getFieldDecorator('fromQuantity', {
              initialValue: info.fromQuantity,
              rules: [{ required: true, message: '请输入开始数量' }],
            })(
              <InputNumber placeholder='请输入' />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='结束数量'>
            {getFieldDecorator('thruQuantity', {
              initialValue: info.thruQuantity,
              rules: [{ required: true, message: '请输入结束数量' }],
            })(
              <InputNumber placeholder='请输入' />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='描述'>
            {getFieldDecorator('description', {
              initialValue: info.description,
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