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
      featureTypeId: props.featureTypeId,
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
        handleFormSubmit({
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
      visible,
      hideModal,
      productFeatureType,
      productFeature,
    } = this.props;
    const { featureTypeId } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 7,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 12,
        },
        md: {
          span: 10,
        },
      },
    };

    return (
      <Modal
        width="60%"
        bodyStyle={{ padding: '32px 40px 48px' }}
        title="新建"
        maskClosable={false}
        visible={visible}
        okText="提交"
        onOk={this.handleSubmit}
        onCancel={hideModal}
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
                {productFeatureType.map(item => (
                  <Select.Option value={item.productFeatureTypeId}>
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
                <Row>
                  {productFeature
                    .filter(item => item.productFeatureTypeId === featureTypeId)
                    .map(item => (
                      <Col span={12}>
                        <Checkbox value={item.productFeatureId}>{item.productFeatureName}</Checkbox>
                      </Col>
                    ))}
                </Row>
              </Checkbox.Group>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="单选/多选">
            {getFieldDecorator('isExclusive', {
              initialValue: info.isExclusive || '0',
              rules: [
                {
                  required: true,
                  message: '请选择单选/多选',
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
