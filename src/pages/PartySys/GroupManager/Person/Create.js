import React from 'react'
import { connect } from 'dva'
import {
  Modal,
  Form,
  Input,
  TreeSelect,
  Select,
  DatePicker,
} from 'antd'
import moment from 'moment'

@connect(({ party, type: sysType, infra }) => ({
  groupList: party.list.partyGroup || [],
  personList: party.list.partyPerson || [],
  roleTypeTree: sysType.tree.roleType || [{}],
  statusItemList: infra.list.statusItem || [],
}))
@Form.create()
class Create extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'party/findAll',
      payload: {
        type: 'partyPerson',
      }
    });
    dispatch({
      type: 'type/tree',
      payload: {
        type: 'roleType',
        id: 'roleTypeId',
        pId: 'parentTypeId',
        title: 'description',
      }
    });
    dispatch({
      type: 'infra/findAll',
      payload: {
        type: 'statusItem',
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
      groupList,
      personList,
      roleTypeTree,
      statusItemList,
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

    const group = groupList.filter(item => item.partyId === info.partyIdFrom)[0] || {}

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
          <Form.Item {...formItemLayout} label="源当事人">
            {group.groupName}
          </Form.Item>
          <Form.Item {...formItemLayout} label='源当事人角色'>
            {getFieldDecorator('roleTypeIdFrom', {
              initialValue: info.roleTypeIdFrom,
              rules: [
                {
                  required: true,
                  message: '请选择',
                },
              ],
              })(
                <TreeSelect
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="请选择"
                  treeDefaultExpandAll
                  treeData={roleTypeTree[0].children}
                />
              )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="目标当事人">
            {getFieldDecorator('partyIdTo', {
              initialValue: info.partyIdTo,
              rules: [{ required: true, message: '请选择目标当事人' }],
            })(
              <Select 
                placeholder="请选择"
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                dropdownMatchSelectWidth={false}
              >
                {personList.map(item => (
                  <Select.Option key={item.partyId}>{item.nickName}</Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='目标当事人角色'>
            {getFieldDecorator('roleTypeIdTo', {
              initialValue: info.roleTypeIdTo,
              rules: [
                {
                  required: true,
                  message: '请选择',
                },
              ],
              })(
                <TreeSelect
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="请选择"
                  treeDefaultExpandAll
                  treeData={roleTypeTree[0].children}
                />
              )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='fromDate'>
            {getFieldDecorator('fromDate', {
              initialValue: moment(info.fromDate),
              rules: [
                {
                  required: true,
                  message: '请选择开始日期',
                },
              ],
              })(<DatePicker placeholder='请选择' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='thruDate'>
            {getFieldDecorator('thruDate', {
              initialValue: moment(info.thruDate),
              rules: [
                {
                  required: true,
                  message: '请选择结束日期',
                },
              ],
              })(<DatePicker placeholder='请选择' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="状态项">
            {getFieldDecorator('statusId', {
              initialValue: info.statusId,
              rules: [{ required: true, message: '请选择状态项' }],
            })(
              <Select 
                placeholder="请选择"
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                dropdownMatchSelectWidth={false}
              >
                {statusItemList.map(item => (
                  <Select.Option key={item.statusId}>{item.statusCode}</Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='关系名称'>
            {getFieldDecorator('relationshipName', {
              initialValue: info.relationshipName,
              rules: [
                {
                  required: true,
                  message: '请输入关系名称',
                },
              ],
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='securityGroupId'>
            {getFieldDecorator('securityGroupId', {
              initialValue: info.securityGroupId,
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='priorityTypeId'>
            {getFieldDecorator('priorityTypeId', {
              initialValue: info.priorityTypeId,
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='partyRelationshipTypeId'>
            {getFieldDecorator('partyRelationshipTypeId', {
              initialValue: info.partyRelationshipTypeId,
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='permissionsEnumId'>
            {getFieldDecorator('permissionsEnumId', {
              initialValue: info.permissionsEnumId,
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='positionTitle'>
            {getFieldDecorator('positionTitle', {
              initialValue: info.positionTitle,
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='评论'>
            {getFieldDecorator('comments', {
              initialValue: info.comments,
              })(<Input placeholder='请输入' />)}
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