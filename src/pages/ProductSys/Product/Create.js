import React from 'react';
import { connect } from 'dva';
import {
  Drawer,
  Form,
  Input,
  TreeSelect,
  DatePicker,
  Radio,
  Checkbox,
  Row,
  Col,
  Button,
} from 'antd';
import moment from 'moment';
import { objToTree } from '@/utils/utils';
import Feature from './Feature';

@connect(({ product }) => ({
  productType: product.dict.productType,
  proudctCategoty: product.dict.proudctCategoty,
  geo: product.dict.geo,
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
          fromDate: values.fromDate.format('YYYY-MM-DD'),
          thruDate: values.thruDate.format('YYYY-MM-DD'),
        });
        form.resetFields();
      }
    });
  };

  render() {
    const {
      title,
      form: { getFieldDecorator },
      info,
      visible,
      hideModal,
      productType,
      proudctCategoty,
      geo,
    } = this.props;

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

    const typeTree = objToTree(
      { productTypeId: '', productTypeName: '父级节点' },
      productType.map(item => (item.parentTypeId ? item : { ...item, parentTypeId: '' })),
      'productTypeId',
      'parentTypeId',
      'productTypeName'
    ).children;

    const categotyTree = objToTree(
      { productCategoryId: '', productCategoryName: '父级节点' },
      proudctCategoty.map(item =>
        item.parentCategoryId ? item : { ...item, parentCategoryId: '' }
      ),
      'productCategoryId',
      'parentCategoryId',
      'productCategoryName'
    ).children;

    return (
      <Drawer
        title={title}
        width="70%"
        destroyOnClose
        maskClosable={false}
        visible={visible}
        onClose={hideModal}
      >
        <Form>
          <Form.Item {...formItemLayout} label="产品名称">
            {getFieldDecorator('productName', {
              initialValue: info.productName,
              rules: [
                {
                  required: true,
                  message: '请输入产品名称',
                },
              ],
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="产品类型">
            {getFieldDecorator('productTypeId', {
              initialValue: info.productTypeId,
              rules: [
                {
                  required: true,
                  message: '请选择产品类型',
                },
              ],
            })(
              <TreeSelect
                dropdownStyle={{
                  maxHeight: 400,
                  overflow: 'auto',
                }}
                placeholder="请选择"
                treeDefaultExpandAll
                treeData={typeTree}
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="上架日期">
            {getFieldDecorator('fromDate', {
              initialValue: moment(info.fromDate),
              rules: [
                {
                  required: true,
                  message: '请选择上架日期',
                },
              ],
            })(
              <DatePicker
                style={{
                  width: '100%',
                }}
                placeholder="选择上架日期"
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="下架日期">
            {getFieldDecorator('thruDate', {
              initialValue: moment(info.thruDate),
              rules: [
                {
                  required: true,
                  message: '请选择下架日期',
                },
              ],
            })(
              <DatePicker
                style={{
                  width: '100%',
                }}
                placeholder="选择下架日期"
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="产品状态">
            {getFieldDecorator('statusId', {
              initialValue: info.statusId || '0',
              rules: [
                {
                  required: true,
                  message: '请选择产品状态',
                },
              ],
            })(
              <Radio.Group>
                <Radio value="0">启用</Radio>
                <Radio value="1">暂停</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="产品类别">
            {getFieldDecorator('proudctCategotyId', {
              initialValue: info.proudctCategotyId,
              rules: [{ required: true, message: '请选择产品类别' }],
            })(
              <TreeSelect
                dropdownStyle={{
                  maxHeight: 400,
                  overflow: 'auto',
                }}
                placeholder="请选择"
                treeDefaultExpandAll
                treeData={categotyTree}
              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="区域属性">
            {getFieldDecorator('geoId', {
              initialValue: info.geoId,
              rules: [{ required: true, message: '请选择区域属性' }],
            })(
              <Checkbox.Group>
                <Row>
                  {geo.map(item => (
                    <Col span={8}>
                      <Checkbox value={item.geoId}>{item.geoName}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="固定属性">
            {getFieldDecorator('fixFeatures', {
              initialValue: info.fixFeatures,
              rules: [
                {
                  required: true,
                  message: '请添加固定属性',
                },
              ],
            })(<Feature title="固定属性" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="必选属性">
            {getFieldDecorator('mustFeatures', {
              initialValue: info.mustFeatures,
              rules: [
                {
                  required: true,
                  message: '请添加必选属性',
                },
              ],
            })(<Feature title="必选属性" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="可选属性">
            {getFieldDecorator('optionFeatures', {
              initialValue: info.optionFeatures,
              rules: [
                {
                  required: true,
                  message: '请添加可选属性',
                },
              ],
            })(<Feature title="可选属性" />)}
          </Form.Item>
        </Form>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            textAlign: 'right',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px',
          }}
        >
          <Button
            style={{
              marginRight: 8,
            }}
            onClick={hideModal}
          >
            取消
          </Button>
          <Button onClick={this.handleSubmit} type="primary">
            提交
          </Button>
        </div>
      </Drawer>
    );
  }
}

export default Create;
