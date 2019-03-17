import React, { Component, Fragment } from 'react'
import router from 'umi/router'
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Button,
} from 'antd'
import FooterToolbar from '@/components/FooterToolbar'

@Form.create()
class Sign extends Component {

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;

    const fieldLabels = {}
    return (
      <Fragment>
        <Card title="仓库管理" bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label="合同编号">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入仓库名称' }],
                  })(<Input placeholder="请输入仓库名称" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.url}>
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                      addonBefore="http://"
                      addonAfter=".com"
                      placeholder="请输入"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.owner}>
                  {getFieldDecorator('owner', {
                    rules: [{ required: true, message: '请选择管理员' }],
                  })(
                    <Select placeholder="请选择管理员">
                      <Select.Option value="xiao">付晓晓</Select.Option>
                      <Select.Option value="mao">周毛毛</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.approver}>
                  {getFieldDecorator('approver', {
                    rules: [{ required: true, message: '请选择审批员' }],
                  })(
                    <Select placeholder="请选择审批员">
                      <Select.Option value="xiao">付晓晓</Select.Option>
                      <Select.Option value="mao">周毛毛</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.dateRange}>
                  {getFieldDecorator('dateRange', {
                    rules: [{ required: true, message: '请选择生效日期' }],
                  })(
                    <DatePicker.RangePicker placeholder={['开始日期', '结束日期']} style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.type}>
                  {getFieldDecorator('type', {
                    rules: [{ required: true, message: '请选择仓库类型' }],
                  })(
                    <Select placeholder="请选择仓库类型">
                      <Select.Option value="private">私密</Select.Option>
                      <Select.Option value="public">公开</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="任务管理" bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.name2}>
                  {getFieldDecorator('name2', {
                    rules: [{ required: true, message: '请输入' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.url2}>
                  {getFieldDecorator('url2', {
                    rules: [{ required: true, message: '请选择' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.owner2}>
                  {getFieldDecorator('owner2', {
                    rules: [{ required: true, message: '请选择管理员' }],
                  })(
                    <Select placeholder="请选择管理员">
                      <Select.Option value="xiao">付晓晓</Select.Option>
                      <Select.Option value="mao">周毛毛</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.approver2}>
                  {getFieldDecorator('approver2', {
                    rules: [{ required: true, message: '请选择审批员' }],
                  })(
                    <Select placeholder="请选择审批员">
                      <Select.Option value="xiao">付晓晓</Select.Option>
                      <Select.Option value="mao">周毛毛</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.dateRange2}>
                  {getFieldDecorator('dateRange2', {
                    rules: [{ required: true, message: '请输入' }],
                  })(
                    <TimePicker
                      placeholder="提醒时间"
                      style={{ width: '100%' }}
                      getPopupContainer={trigger => trigger.parentNode}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.type2}>
                  {getFieldDecorator('type2', {
                    rules: [{ required: true, message: '请选择仓库类型' }],
                  })(
                    <Select placeholder="请选择仓库类型">
                      <Select.Option value="private">私密</Select.Option>
                      <Select.Option value="public">公开</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <FooterToolbar>
          <Button onClick={() => router.go(-1)}>
            后退
          </Button>
          <Button type="primary" onClick={this.validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </Fragment>
    )
  }
}

export default Sign