import React from 'react'
import { connect } from 'dva'
import {
  Modal,
  Form,
  TreeSelect,
  Input,
  Radio,
} from 'antd'

@connect(({ type: sysType }) => ({
  contactMechTypeTree: sysType.tree.contactMechType || [{children: []}],
}))
@Form.create()
class Create extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'type/tree',
      payload: {
        type: 'contactMechType',
        id: 'contactMethTypeId',
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
      tree,
      contactMechTypeTree,
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
          <Form.Item {...formItemLayout} label="联系机制类型">
            {getFieldDecorator('contactMechTypeId', {
              initialValue: info.contactMechTypeId,
              rules: [{ required: true, message: '请选择联系机制类型' }],
            })(
              <TreeSelect
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择"
                treeDefaultExpandAll
                treeData={contactMechTypeTree[0].children}
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='名称'>
            {getFieldDecorator('communicationEventTypeName', {
              initialValue: info.communicationEventTypeName,
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
          <Form.Item {...formItemLayout} label='是否有表'>
            {getFieldDecorator('hasTable', {
              initialValue: info.hasTable,
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