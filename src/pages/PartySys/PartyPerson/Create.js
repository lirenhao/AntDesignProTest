import React from 'react'
import { connect } from 'dva'
import {
  Modal,
  Form,
  Input,
  Radio,
  DatePicker,
  TreeSelect,
} from 'antd'
import moment from 'moment'

@connect(({ type: sysType }) => ({
  idType: sysType.partyIdentificationType,
  idTypeTree: sysType.tree.partyIdentificationType || [{}],
}))
@Form.create()
class Create extends React.Component {

  handleSubmit = e => {
    const { handleFormSubmit, form, info } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        handleFormSubmit({ 
          ...info,
          ...values,
          birthDate: values.birthDate.format('YYYY-MM-DD'),
        });
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
      idTypeTree,
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
          <Form.Item {...formItemLayout} label='首姓名'>
            {getFieldDecorator('firstName', {
              initialValue: info.firstName,
              rules: [
                {
                  required: true,
                  message: '请输入首姓名',
                },
              ],
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='中间姓名'>
            {getFieldDecorator('middleName', {
              initialValue: info.middleName,
              rules: [
                {
                  required: true,
                  message: '请输入中间姓名',
                },
              ],
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='最后姓名'>
            {getFieldDecorator('lastName', {
              initialValue: info.lastName,
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='头衔'>
            {getFieldDecorator('personalTitle', {
              initialValue: info.personalTitle,
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='昵称'>
            {getFieldDecorator('nickName', {
              initialValue: info.nickName,
              rules: [
                {
                  required: true,
                  message: '请输入昵称',
                },
              ],
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="性别">
            {getFieldDecorator('genderTypeId', {
              initialValue: info.genderTypeId,
              rules: [{ required: true, message: '请选择性别' }],
            })(
              <Radio.Group>
                <Radio value="0">女</Radio>
                <Radio value="1">男</Radio>
                <Radio value="2">未知</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='出生日期'>
            {getFieldDecorator('birthDate', {
              initialValue: moment(info.birthDate),
              rules: [
                {
                  required: true,
                  message: '请选择出生日期',
                },
              ],
              })(<DatePicker placeholder='选择日期' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="婚姻状况">
            {getFieldDecorator('maritalStatus', {
              initialValue: info.maritalStatus,
              rules: [{ required: true, message: '请选择婚姻状况' }],
            })(
              <Radio.Group>
                <Radio value="0">未婚</Radio>
                <Radio value="1">已婚</Radio>
                <Radio value="2">未知</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="证件类型">
            {getFieldDecorator('defaultPartyIdentificationTypeId', {
              initialValue: info.defaultPartyIdentificationTypeId,
              rules: [{ required: true, message: '请选择证件类型' }],
            })(
              <TreeSelect
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择"
                treeDefaultExpandAll
                treeData={idTypeTree[0].children}
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='工作年限'>
            {getFieldDecorator('totalYearsWorkExperience', {
                initialValue: info.totalYearsWorkExperience,
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="雇佣状态">
            {getFieldDecorator('employmentStatusId', {
              initialValue: info.employmentStatusId,
            })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="居住状态">
            {getFieldDecorator('residenceStatusId', {
              initialValue: info.residenceStatusId,
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