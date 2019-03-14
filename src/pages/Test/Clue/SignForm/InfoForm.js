import React from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
} from 'antd';

export default ({formLayout, formVals, form}) => (
  <Row>
    <Col span={12}>
      <Form.Item key="bianhao" {...formLayout} label="合同编号">
        {form.getFieldDecorator('bianhao', {
          rules: [{ required: true, message: '请输入合同编号！' }],
          initialValue: "合同编号",
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item key="gongsi" {...formLayout} label="公司名称">
        {form.getFieldDecorator('gongsi', {
          rules: [{ required: true, message: '请输入公司名称！' }],
          initialValue: "公司名称",
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item key="daili" {...formLayout} label="代理机构">
        {form.getFieldDecorator('daili', {
          rules: [{ required: true, message: '请选择代理机构！' }],
          initialValue: "1",
        })(
          <Select style={{ width: '100%' }}>
            <Select.Option value="1">无</Select.Option>
            <Select.Option value="2">有</Select.Option>
          </Select>
        )}
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item key="fukuan" {...formLayout} label="付款方式">
        {form.getFieldDecorator('fukuan', {
          rules: [{ required: true, message: '请选择付款方式！' }],
          initialValue: "1",
        })(
          <Select style={{ width: '100%' }}>
            <Select.Option value="1">无</Select.Option>
            <Select.Option value="2">银行卡</Select.Option>
          </Select>
        )}
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item key="htzje" {...formLayout} label="合同总金额">
        {form.getFieldDecorator('htzje', {
          initialValue: formVals.htzje,
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item key="ssje" {...formLayout} label="实收金额">
        {form.getFieldDecorator('ssje', {
          initialValue: formVals.ssje,
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item key="fwf" {...formLayout} label="服务费">
        {form.getFieldDecorator('fwf', {
          initialValue: formVals.fwf,
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item key="yhje" {...formLayout} label="优惠金额">
        {form.getFieldDecorator('yhje', {
          initialValue: formVals.yhje,
        })(<Input placeholder="请输入" />)}
      </Form.Item>
    </Col>
    <Col span={24}>
      <Form.Item key="desc" {...formLayout} label="业务详细描述">
        {form.getFieldDecorator('desc', {
          initialValue: formVals.desc,
        })(<Input.TextArea rows={4} placeholder="请输入至少五个字符" />)}
      </Form.Item>
    </Col>
  </Row>
)
