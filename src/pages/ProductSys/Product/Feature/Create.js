import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Radio, Select, Checkbox, Row, Col } from 'antd';

@connect(({ product }) => ({
  productFeatureType: product.dict.productFeatureType,
  productFeature: product.dict.productFeature,
}))
@Form.create()
class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featureTypeId: props.info.featureTypeId,
    };
  }

  featureTypeChange = value => {
    this.setState({
      featureTypeId: value,
    });
  };

  handleSubmit = e => {
    const { handleFormSubmit, form, info } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        handleFormSubmit(
          {
            ...info,
            ...values,
          },
          info
        );
        form.resetFields();
        this.setState({ featureTypeId: undefined });
      }
    });
  };

  handleCancel = () => {
    const { hideModal } = this.props;
    hideModal();
    this.setState({ featureTypeId: undefined });
  };

  renderCheckbox = () => {
    const { productFeature, limit, info } = this.props;
    const { featureTypeId } = this.state;
    const typeId = featureTypeId || info.featureTypeId;
    const ids = info.featureIds || [];
    const feature = productFeature
      .filter(item => item.productFeatureTypeId === typeId)
      .filter(
        item =>
          limit.featureIds.indexOf(item.productFeatureId) < 0 ||
          ids.indexOf(item.productFeatureId) > -1
      );
    if (feature.length > 0) {
      return feature.map(item => (
        <Col span={24} key={item.productFeatureId}>
          <Checkbox value={item.productFeatureId}>{item.productFeatureName}</Checkbox>
        </Col>
      ));
    }
    return featureTypeId ? '该类型下没有可选属性' : '请先选择属性类型';
  };

  render() {
    const {
      form: { getFieldDecorator },
      visible,
      productFeatureType,
      title,
      limit,
      value,
      info,
    } = this.props;

    const featureType = productFeatureType.filter(
      item =>
        limit.featureTypeIds.indexOf(item.productFeatureTypeId) < 0 ||
        item.productFeatureTypeId === info.featureTypeId ||
        (item.productFeatureTypeId === 'QYBGLX' &&
          value.map(v => v.featureTypeId).indexOf(item.productFeatureTypeId) < 0)
    );

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
      <Modal
        width="60%"
        bodyStyle={{ padding: '32px 40px 48px' }}
        title={title}
        maskClosable={false}
        destroyOnClose
        visible={visible}
        okText="确定"
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
      >
        <Form>
          <Form.Item {...formItemLayout} label="属性类型">
            {getFieldDecorator('featureTypeId', {
              initialValue: info.featureTypeId,
              rules: [{ required: true, message: '请选择属性类型' }],
            })(
              <Select
                placeholder="请选择属性类型"
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                dropdownMatchSelectWidth={false}
                onChange={this.featureTypeChange}
              >
                {featureType.map(item => (
                  <Select.Option key={item.productFeatureTypeId} value={item.productFeatureTypeId}>
                    {item.productFeatureTypeName}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="产品属性">
            {getFieldDecorator('featureIds', {
              initialValue: info.featureIds || [],
              rules: [{ required: true, message: '请选择产品属性' }],
            })(
              <Checkbox.Group>
                <Row>{this.renderCheckbox()}</Row>
              </Checkbox.Group>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="是否多选">
            {getFieldDecorator('isExclusive', {
              initialValue: info.isExclusive || '0',
              rules: [
                {
                  required: true,
                  message: '请选择单选或多选',
                },
              ],
            })(
              <Radio.Group>
                <Radio value="0">单选</Radio>
                <Radio value="1">多选</Radio>
              </Radio.Group>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Create;
