import React from 'react'
import { connect } from 'dva'
import {
  Modal,
  Form,
  Input,
  TreeSelect,
} from 'antd'

@connect(({ type: sysType }) => ({
  featureTypeTree: sysType.tree.productFeatureType || [{}],
}))
@Form.create()
class Create extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'type/tree',
      payload: {
        type: 'productFeatureType',
        id: 'productFeatureTypeId',
        pId: 'parentTypeId',
        title: 'description',
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
      visible,
      hideModal,
      info,
      featureTypeTree,
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
              initialValue: info.productFeatureTypeId,
              rules: [{ required: true, message: '请选择产品特征类型' }],
            })(
              <TreeSelect
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择"
                treeDefaultExpandAll
                treeData={featureTypeTree[0].children}
              />
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
          <Form.Item {...formItemLayout} label='uomId'>
            {getFieldDecorator('uomId', {
              initialValue: info.uomId,
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
              initialValue: info.numberSpecified,
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='defaultAmount'>
            {getFieldDecorator('defaultAmount', {
              initialValue: info.defaultAmount,
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='defaultSequenceNum'>
            {getFieldDecorator('defaultSequenceNum', {
              initialValue: info.defaultSequenceNum,
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='ABBREV'>
            {getFieldDecorator('ABBREV', {
              initialValue: info.ABBREV,
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='idCode'>
            {getFieldDecorator('idCode', {
              initialValue: info.idCode,
              })(<Input placeholder='请输入' />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Create;