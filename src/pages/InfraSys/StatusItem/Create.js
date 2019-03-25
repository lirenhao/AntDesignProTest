import React from 'react'
import { connect } from 'dva'
import {
  Modal,
  Form,
  Input,
  TreeSelect,
  InputNumber,
} from 'antd'

@connect(({ type: sysType }) => ({
  typeTree: sysType.tree.statusType || [{}],
}))
@Form.create()
class Create extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'type/tree',
      payload: {
        type: 'statusType',
        id: 'statusTypeId',
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
      info,
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
          <Form.Item {...formItemLayout} label='状态码'>
            {getFieldDecorator('statusCode', {
              initialValue: info.statusCode,
              rules: [
                {
                  required: true,
                  message: '请输入状态码',
                },
              ],
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="状态类型">
            {getFieldDecorator('statusTypeId', {
              initialValue: info.statusTypeId,
              rules: [{ required: true, message: '请选择状态类型' }],
            })(
              <TreeSelect
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择"
                treeDefaultExpandAll
                treeData={typeTree[0].children}
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='序列号'>
            {getFieldDecorator('sequenceId', {
              initialValue: info.sequenceId,
              rules: [{ required: true, message: '请输入序列号' }],
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