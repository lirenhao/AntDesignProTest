import React, { PureComponent } from 'react';
import {
  Form,
  Select,
  Button,
  DatePicker,
  Modal,
  Steps,
  Checkbox,
} from 'antd';
import InfoForm from './InfoForm';
import DetailForm from './DetailForm';
import UploadForm from './UploadForm'

@Form.create()
class SignForm extends PureComponent {
  static defaultProps = {
    handleSign: () => {},
    handleSignModalVisible: () => {},
    values: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      formVals: {
        name: props.values.name,
        desc: props.values.desc,
        key: props.values.key,
        target: '0',
        template: '0',
        type: '1',
        time: '',
        frequency: 'month',
      },
      currentStep: 0,
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
    };
  }

  handleNext = currentStep => {
    const { form, handleSign } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          if (currentStep < 4) {
            this.forward();
          } else {
            handleSign(formVals);
          }
        }
      );
    });
  };

  backward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };

  renderContent = (currentStep, formVals) => {
    const { form } = this.props;
    if (currentStep === 0) {
      return (
        <InfoForm formLayout={this.formLayout} formVals={formVals} form={form} />
      );
    }
    if (currentStep === 1) {
      return (
        <DetailForm formLayout={this.formLayout} formVals={formVals} form={form} />
      )
    }
    if (currentStep === 2) {
      return [
        <Form.Item key="danbao" {...this.formLayout} label="担保人">
          {form.getFieldDecorator('danbao', {
            rules: [{ required: true, message: '请选择担保人！' }],
            initialValue: "0",
          })(
            <Select style={{ width: '100%' }}>
              <Select.Option value="0">王文君</Select.Option>
            </Select>
          )}
        </Form.Item>,
        <Form.Item key="zhognjie" {...this.formLayout} label="中介">
          {form.getFieldDecorator('zhognjie', {
            rules: [{ required: true, message: '请选择中介！' }],
            initialValue: "0",
          })(
            <Select style={{ width: '100%' }}>
              <Select.Option value="0">李华</Select.Option>
            </Select>
          )}
        </Form.Item>,
        <Form.Item key="weituo" {...this.formLayout} label="委托">
          {form.getFieldDecorator('weituo', {
            rules: [{ required: true, message: '请选择委托！' }],
            initialValue: "0",
          })(
            <Select style={{ width: '100%' }}>
              <Select.Option value="0">刘明</Select.Option>
            </Select>
          )}
        </Form.Item>,
      ]
    }
    if (currentStep === 3) {
      return (
        <Form.Item key="yqht" {...this.formLayout} label="其他已签合同">
          {form.getFieldDecorator('yqht', {
            rules: [{ required: true, message: '请选已签合同！' }],
            initialValue: ["1", "2"],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Checkbox value="1">记账</Checkbox>
              <Checkbox value="2">委托代理</Checkbox>
              <Checkbox value="3">服务协议</Checkbox>
            </Checkbox.Group>
          )}
        </Form.Item>
      )
    }
    if (currentStep === 4) {
      return (
        <UploadForm formLayout={this.formLayout} formVals={formVals} form={form} />
      )
    }
    if (currentStep === 5) {
      return [
        <Form.Item key="time" {...this.formLayout} label="开始时间">
          {form.getFieldDecorator('time', {
            rules: [{ required: true, message: '请选择开始时间！' }],
          })(
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="选择开始时间"
            />
          )}
        </Form.Item>,
        <Form.Item key="frequency" {...this.formLayout} label="调度周期">
          {form.getFieldDecorator('frequency', {
            initialValue: formVals.frequency,
          })(
            <Select style={{ width: '100%' }}>
              <Select.Option value="month">月</Select.Option>
              <Select.Option value="week">周</Select.Option>
            </Select>
          )}
        </Form.Item>,
      ];
    }
    return null;
  };

  renderFooter = currentStep => {
    const { handleSignModalVisible, values } = this.props;
    if (currentStep === 0) {
      return [
        <Button key="cancel" onClick={() => handleSignModalVisible(false, values)}>
          取消
        </Button>,
        <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
          下一步
        </Button>,
      ]
    }
    if (currentStep === 4) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleSignModalVisible(false, values)}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          保存
        </Button>,
      ];
    }
    return [
      <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
        上一步
      </Button>,
      <Button key="cancel" onClick={() => handleSignModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        下一步
      </Button>,
    ];
  };

  render() {
    const { signModalVisible, handleSignModalVisible, values } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        width="80%"
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        maskClosable={false}
        title="添加合同"
        visible={signModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleSignModalVisible(false, values)}
        afterClose={() => handleSignModalVisible()}
      >
        <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          <Steps.Step title="基本信息" />
          <Steps.Step title="合同服务明细" />
          <Steps.Step title="合同当事人" />
          <Steps.Step title="合同关联" />
          <Steps.Step title="其他" />
        </Steps>
        <Form onSubmit={this.handleSign}>
          {this.renderContent(currentStep, formVals)}
        </Form>
      </Modal>
    );
  }
}

export default SignForm;