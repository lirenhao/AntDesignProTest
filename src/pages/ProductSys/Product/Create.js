import React from 'react'
import { connect } from 'dva'
import {
  Modal,
  Form,
  Input,
  TreeSelect,
  DatePicker,
} from 'antd'

@connect(({ productType }) => ({
  typeTree: productType.tree.type || [{}],
}))
@Form.create()
class Create extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'productType/tree',
      payload: {
        type: 'type',
        id: 'productTypeId',
        pId: 'parentTypeId',
        title: 'productTypeName',
      }
    });
  }

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
      typeTree,
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
          <Form.Item {...formItemLayout} label='产品名称'>
            {getFieldDecorator('productName', {
              rules: [
                {
                  required: true,
                  message: '请输入产品名称',
                },
              ],
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="产品类型">
            {getFieldDecorator('productTypeId', {
              rules: [{ required: true, message: '请选择产品类型' }],
            })(
              <TreeSelect
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择"
                treeDefaultExpandAll
                treeData={typeTree[0].children}
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='introductionDate'>
            {getFieldDecorator('introductionDate', {
              rules: [
                {
                  required: true,
                  message: '请选择时间',
                },
              ],
              })(<DatePicker 
                style={{ width: '100%' }}
                placeholder='选择时间' 
              />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='relaseDate'>
            {getFieldDecorator('relaseDate', {
              rules: [
                {
                  required: true,
                  message: '请选择时间',
                },
              ],
              })(<DatePicker 
                style={{ width: '100%' }}
                placeholder='选择时间' 
              />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='supportDiscontinuationDate'>
            {getFieldDecorator('supportDiscontinuationDate', {
              rules: [
                {
                  required: true,
                  message: '请选择时间',
                },
              ],
              })(<DatePicker 
                style={{ width: '100%' }}
                placeholder='选择时间' 
              />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='salesDiscontinuationDate'>
            {getFieldDecorator('salesDiscontinuationDate', {
              rules: [
                {
                  required: true,
                  message: '请选择时间',
                },
              ],
              })(<DatePicker 
                style={{ width: '100%' }}
                placeholder='选择时间' 
              />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='salesDiscWhenNotAvail'>
            {getFieldDecorator('salesDiscWhenNotAvail', {
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='InternalName'>
            {getFieldDecorator('InternalName', {
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='comments'>
            {getFieldDecorator('comments', {
              })(<Input placeholder='请输入' />)}
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