import React from 'react'
import { connect } from 'dva'
import {
  Modal,
  Form,
  Select,
  Input,
  DatePicker,
  InputNumber,
} from 'antd'
import moment from 'moment'

@connect(({ product }) => ({
  product: product.data.list,
}))
@Form.create()
class Create extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'product/findAll',
      payload: {
        type: 'product',
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
      product,
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
        title='添加类别成员'
        maskClosable={false}
        visible={visible}
        okText="提交"
        onOk={this.handleSubmit}
        onCancel={hideModal}
      >
        <Form>
          <Form.Item {...formItemLayout} label='产品名称'>
            {getFieldDecorator('productName', {
              initialValue: info.productName,
              rules: [
                {
                  required: true,
                  message: '请输入产品名称',
                },
              ],
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {Object.keys(product).map(key => (
                    <Select.Option value={key}>{product[key].productName}</Select.Option>
                  ))}
                </Select>
              )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='开始日期'>
            {getFieldDecorator('fromDate', {
              initialValue: moment(info.fromDate),
              rules: [
                {
                  required: true,
                  message: '请选择开始日期',
                },
              ],
              })(<DatePicker 
                style={{ width: '100%' }}
                placeholder='选择开始日期' 
              />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='结束日期'>
            {getFieldDecorator('thruDate', {
              initialValue: moment(info.thruDate),
              rules: [
                {
                  required: true,
                  message: '请选择结束日期',
                },
              ],
              })(<DatePicker 
                style={{ width: '100%' }}
                placeholder='选择结束日期' 
              />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='评论'>
            {getFieldDecorator('comments', {
              initialValue: info.comments,
            })(<Input.TextArea
              style={{ minHeight: 32 }}
              placeholder='请输入'
              rows={3}
            />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='序列'>
            {getFieldDecorator('sequenceNum', {
                initialValue: info.sequenceNum,
              })(<InputNumber placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='数量'>
            {getFieldDecorator('quantity', {
                initialValue: info.quantity,
              })(<InputNumber placeholder='请输入' />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Create;