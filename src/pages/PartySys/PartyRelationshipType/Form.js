import React from 'react'
import {
  Form,
  TreeSelect,
  Input,
  Radio,
  Button,
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
      form: { 
        getFieldDecorator 
      },
      info,
      tree,
      roleTypeTree,
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
    };
    
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    
    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
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
        <Form.Item {...formItemLayout} label='当事人关系类型名称'>
          {getFieldDecorator('partyRelationshipName', {
            initialValue: info.partyRelationshipName,
            rules: [
              {
                required: true,
                message: '请输入当事人关系类型名称',
              },
            ],
            })(<Input placeholder='请输入' />)}
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
        <Form.Item {...formItemLayout} label='源有效角色'>
          {getFieldDecorator('roleTypeIdValidFrom', {
            initialValue: info.roleTypeIdValidFrom,
            rules: [
              {
                required: true,
                message: '请选择源有效角色',
              },
            ],
            })(
              <TreeSelect
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择"
                treeDefaultExpandAll
                treeData={roleTypeTree}
              />
            )}
        </Form.Item>
        <Form.Item {...formItemLayout} label='目标有效角色'>
          {getFieldDecorator('roleTypeIdValidTo', {
            initialValue: info.roleTypeIdValidTo,
            rules: [
              {
                required: true,
                message: '请选择目标有效角色',
              },
            ],
            })(
              <TreeSelect
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择"
                treeDefaultExpandAll
                treeData={roleTypeTree}
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
        <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Create;