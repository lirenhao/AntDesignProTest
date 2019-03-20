import React from 'react'
import { connect } from 'dva'
import {
  Modal,
  Form,
  Input,
  Select,
} from 'antd'

@connect(({ productType }) => ({
  categoryType: productType.categoryType,
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
      categorys,
      categoryType,
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
          <Form.Item {...formItemLayout} label='产品类别名称'>
            {getFieldDecorator('productCategoryName', {
              rules: [
                {
                  required: true,
                  message: '请输入产品类别名称',
                },
              ],
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="产品类别类型">
            {getFieldDecorator('productCategoryTypeId', {
              rules: [{ required: true, message: '请选择产品类别类型' }],
            })(
              <Select placeholder="请选择">
                {Object.keys(categoryType).map(key => (
                  <Select.Option value={key}>{categoryType[key].description}</Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="主父产品类别">
            {getFieldDecorator('primaryParentCategoryId', {
            })(
              <Select placeholder="请选择">
                {categorys.map(item => (<Select.Option value={item.key}>{item.title}</Select.Option>))}
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='描述'>
            {getFieldDecorator('description', {
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