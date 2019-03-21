import React from 'react'
import { connect } from 'dva'
import {
  Modal,
  Form,
  Input,
  Select,
} from 'antd'

@connect(({ productType }) => ({
  priceType: productType.priceType,
  pricePurpose: productType.pricePurpose,
}))
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
      info,
      visible,
      hideModal,
      priceType,
      pricePurpose,
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
          <Form.Item {...formItemLayout} label="产品价格类型">
            {getFieldDecorator('productPriceTypeId', {
              initialValue: info.productPriceTypeId,
              rules: [{ required: true, message: '请选择产品价格类型' }],
            })(
              <Select placeholder="请选择">
                {Object.keys(priceType).map(key => (
                  <Select.Option value={key}>{priceType[key].description}</Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="产品价格用途">
            {getFieldDecorator('productPricePurposeId', {
              initialValue: info.productPricePurposeId,
              rules: [{ required: true, message: '请选择产品价格用途' }],
            })(
              <Select placeholder="请选择">
                {Object.keys(pricePurpose).map(key => (
                  <Select.Option value={key}>{pricePurpose[key].description}</Select.Option>
                ))}
              </Select>
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