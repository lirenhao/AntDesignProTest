import React from 'react';
import { connect } from 'dva';
import { Card, Form, Radio, Input, Button } from 'antd';

@connect(({ loading }) => ({
  loading: loading.models.orderCreateInfo,
}))
@Form.create()
class BasicInfo extends React.Component {
  handleSubmit = e => {
    const { handleNext, form, info } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        handleNext({
          ...info,
          ...values,
        });
        form.resetFields();
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      info,
      handlePrev,
      loading,
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

    return (
      <React.Fragment>
        <div
          style={{
            marginTop: '16px',
            border: '1px dashed #e9e9e9',
            borderRadius: '6px',
            backgroundColor: '#fafafa',
            minHeight: '200px',
            textAlign: 'center',
          }}
        >
          <Card title="输入订单信息" bordered={false}>
            <Form>
              <Form.Item {...formItemLayout} label="客户分期">
                {getFieldDecorator('instalmentTypeEnumId', {
                  initialValue: info.instalmentTypeEnumId || '0',
                  rules: [
                    {
                      required: true,
                      message: '请选择分期',
                    },
                  ],
                })(
                  <Radio.Group>
                    <Radio value="0">完全不分期</Radio>
                    <Radio value="1">分一期</Radio>
                    <Radio value="2">分两期</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label="续费状态">
                {getFieldDecorator('renewalFeeStatusId', {
                  initialValue: info.renewalFeeStatusId || '0',
                  rules: [
                    {
                      required: true,
                      message: '请选择续费状态',
                    },
                  ],
                })(
                  <Radio.Group>
                    <Radio value="0">否</Radio>
                    <Radio value="1">是</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label="公司法人">
                {getFieldDecorator('legalPartyGroupName', {
                  initialValue: info.legalPartyGroupName,
                  rules: [
                    {
                      required: true,
                      message: '请输入公司法人',
                    },
                  ],
                })(<Input placeholder="请输入" />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="公司名称">
                {getFieldDecorator('corpName', {
                  initialValue: info.corpName,
                  rules: [
                    {
                      required: true,
                      message: '请输入公司名称',
                    },
                  ],
                })(<Input placeholder="请输入" />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="合同类型">
                {getFieldDecorator('agreementTypeId', {
                  initialValue: info.agreementTypeId,
                  rules: [
                    {
                      required: true,
                      message: '请输入合同类型',
                    },
                  ],
                })(<Input placeholder="请输入" />)}
              </Form.Item>
              <Form.Item {...formItemLayout} label="合同编号">
                {getFieldDecorator('agreementCode', {
                  initialValue: info.agreementCode,
                  rules: [
                    {
                      required: true,
                      message: '请输入合同编号',
                    },
                  ],
                })(<Input placeholder="请输入" />)}
              </Form.Item>
            </Form>
          </Card>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px',
          }}
        >
          <Button type="primary" onClick={this.handleSubmit} loading={loading}>
            下一步
          </Button>
          <Button onClick={handlePrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default BasicInfo;
