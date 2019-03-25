import React from 'react'
import { connect } from 'dva'
import {
  Modal,
  Form,
  Input,
  TreeSelect,
  DatePicker,
  Radio,
} from 'antd'
import moment from 'moment'

@connect(({ type: sysType }) => ({
  typeTree: sysType.tree.emplPositionType || [{}],
}))
@Form.create()
class Create extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'type/tree',
      payload: {
        type: 'emplPositionType',
        id: 'emplPositionTypeId',
        pId: 'parentTypeId',
        title: 'emplPositionTypeName',
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
          <Form.Item {...formItemLayout} label='职位名称'>
            {getFieldDecorator('emplPositionName', {
              initialValue: info.emplPositionName,
              rules: [
                {
                  required: true,
                  message: '请输入职位名称',
                },
              ],
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="职位类型">
            {getFieldDecorator('emplPositionTypeId', {
              initialValue: info.emplPositionTypeId,
              rules: [{ required: true, message: '请选择职位类型' }],
            })(
              <TreeSelect
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择"
                treeDefaultExpandAll
                treeData={typeTree[0].children}
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='partyId'>
            {getFieldDecorator('partyId', {
              initialValue: info.partyId,
              rules: [
                {
                  required: true,
                  message: '请输入partyId',
                },
              ],
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='budgetId'>
            {getFieldDecorator('budgetId', {
              initialValue: info.budgetId,
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='budgetItemSeqId'>
            {getFieldDecorator('budgetItemSeqId', {
              initialValue: info.budgetItemSeqId,
              })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='estimatedFromDate'>
            {getFieldDecorator('estimatedFromDate', {
              initialValue: moment(info.estimatedFromDate),
              rules: [
                {
                  required: true,
                  message: 'estimatedFromDate',
                },
              ],
              })(<DatePicker placeholder='estimatedFromDate' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='estimatedThruDate'>
            {getFieldDecorator('estimatedThruDate', {
              initialValue: moment(info.estimatedThruDate),
              rules: [
                {
                  required: true,
                  message: 'estimatedThruDate',
                },
              ],
              })(<DatePicker placeholder='estimatedThruDate' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='是否给薪水'>
            {getFieldDecorator('isSalaryFlag', {
              initialValue: info.isSalaryFlag,
              rules: [
                {
                  required: true,
                  message: '请选择',
                },
              ],
              })(
                <Radio.Group>
                  <Radio value="0">否</Radio>
                  <Radio value="1">是</Radio>
                </Radio.Group>
              )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='是否全职'>
            {getFieldDecorator('isFulltimeFlag', {
              initialValue: info.isFulltimeFlag,
              rules: [
                {
                  required: true,
                  message: '请选择',
                },
              ],
              })(
                <Radio.Group>
                  <Radio value="0">否</Radio>
                  <Radio value="1">是</Radio>
                </Radio.Group>
              )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='实际开始时间'>
            {getFieldDecorator('actualFromDate', {
              initialValue: moment(info.actualFromDate),
              rules: [
                {
                  required: true,
                  message: 'actualFromDate',
                },
              ],
              })(<DatePicker placeholder='请选择实际开始时间' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='实际终止时间'>
            {getFieldDecorator('actualThruDate', {
              initialValue: moment(info.actualThruDate),
              rules: [
                {
                  required: true,
                  message: 'actualThruDate',
                },
              ],
              })(<DatePicker placeholder='请选择实际终止时间' />)}
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