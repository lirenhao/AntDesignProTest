import React from 'react'
import { connect } from 'dva'
import {
  Modal,
  Form,
  Input,
  TreeSelect,
} from 'antd'

@connect(({ productType }) => ({
  categoryTypeTree: productType.tree.categoryType || [{}],
}))
@Form.create()
class Create extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'productType/tree',
      payload: {
        type: 'categoryType',
        id: 'productCategoryTypeId',
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
      tree,
      info,
      categoryTypeTree,
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
            {getFieldDecorator('categoryName', {
              initialValue: info.categoryName,
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
              initialValue: info.productCategoryTypeId,
              rules: [{ required: true, message: '请选择产品类别类型' }],
            })(
              <TreeSelect
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择"
                treeDefaultExpandAll
                treeData={categoryTypeTree[0].children}
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="主父产品类别">
            {getFieldDecorator('primaryParentCategoryId', {
              initialValue: info.primaryParentCategoryId,
            })(
              <TreeSelect
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择"
                treeDefaultExpandAll
                treeData={tree}
              />
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