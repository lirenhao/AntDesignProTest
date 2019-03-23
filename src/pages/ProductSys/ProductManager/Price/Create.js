import React from 'react'
import { connect } from 'dva'
import {
  Drawer,
  Form,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  Input,
  Button,
} from 'antd'
import FooterToolbar from '@/components/FooterToolbar'
import moment from 'moment'

const geo = [{
  value: '北京',
  label: '北京',
  children: [{
    value: '北京市',
    label: '北京市',
    children: [{
      value: '通州区',
      label: '昌平区',
    }],
  }],
}, {
  value: '上海',
  label: '上海',
  children: [{
    value: '上海市',
    label: '上海市',
    children: [{
      value: '浦东区',
      label: '浦东区',
    }],
  }],
}];

@connect(({ productType, productFeature, loading }) => ({
  priceType: productType.priceType,
  pricePurpose: productType.pricePurpose,
  productFeature: productFeature.data.list,
  loading: loading.models.productPriceComp,
}))
@Form.create()
class Create extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'productFeature/findAll',
      payload: {
        type: 'feature',
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
      title,
      visible,
      hideModal,
      info,
      priceType,
      pricePurpose,
      productFeature,
      loading,
    } = this.props;

    const width = "40%"

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
      <Drawer
        width={width}
        destroyOnClose
        maskClosable={false}
        title={title}
        visible={visible}
        onClose={hideModal}
      >
        <Form>
          <Form.Item {...formItemLayout} label='产品价格类型'>
            {getFieldDecorator('productPriceTypeId', {
              initialValue: info.productPriceTypeId,
              rules: [
                {
                  required: true,
                  message: '请选择产品价格类型',
                },
              ],
              })(
                <Select placeholder="产品价格类型">
                  {Object.keys(priceType).map(key => (
                    <Select.Option key={priceType[key].productPriceTypeId}>{priceType[key].description}</Select.Option>
                  ))}
                </Select>
              )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='产品价格用途'>
            {getFieldDecorator('productPricePurposeId', {
              initialValue: info.productPricePurposeId,
              rules: [
                {
                  required: true,
                  message: '请选择产品价格用途',
                },
              ],
              })(
                <Select placeholder="产品价格用途">
                  {Object.keys(pricePurpose).map(key => (
                    <Select.Option key={pricePurpose[key].productPricePurposeId}>{pricePurpose[key].description}</Select.Option>
                  ))}
                </Select>
              )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='特征标识定价'>
            {getFieldDecorator('productFeatureId', {
              initialValue: info.productFeatureId,
              rules: [
                {
                  required: true,
                  message: '请选择特征标识定价',
                },
              ],
              })(
                <Select placeholder="特征标识定价">
                  {productFeature.map(item => (
                    <Select.Option key={item.productFeatureId}>{item.description}</Select.Option>
                  ))}
                </Select>
              )}
          </Form.Item>
          <Form.Item {...formItemLayout} label='区域标识定价'>
            {getFieldDecorator('geoId', {
              initialValue: info.geoId,
              rules: [
                {
                  required: true,
                  message: '请选择区域标识定价',
                },
              ],
              })(<Cascader options={geo} placeholder="区域标识定价" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='开定价始日期'>
            {getFieldDecorator('fromDate', {
              initialValue: moment(info.fromDate),
              rules: [
                {
                  required: true,
                  message: '请选择定价开始日期',
                },
              ],
              })(<DatePicker placeholder='选择定价开始日期' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='定价结束日期'>
            {getFieldDecorator('thruDate', {
              initialValue: moment(info.thruDate),
              rules: [
                {
                  required: true,
                  message: '请选择定价结束日期',
                },
              ],
              })(<DatePicker placeholder='选择定价结束日期' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='具体价格'>
            {getFieldDecorator('price', {
              initialValue: info.price,
              rules: [
                {
                  required: true,
                  message: '请输入具体价格',
                },
              ],
              })(<InputNumber
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                placeholder='具体价格' 
              />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='具体百分比'>
            {getFieldDecorator('percent', {
              initialValue: info.percent,
              rules: [
                {
                  required: true,
                  message: '请输入具体百分比',
                },
              ],
              })(<InputNumber
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
                placeholder='具体百分比' 
              />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label='描述'>
            {getFieldDecorator('descript', {
              initialValue: info.descript,
              })(<Input.TextArea placeholder='请输入' rows={3} />)}
          </Form.Item>
        </Form>
        <FooterToolbar style={{width}}>
          <Button 
            style={{marginRight: 8,}} 
            type="primary" 
            loading={loading}
            onClick={this.handleSubmit}
          >
            提交
          </Button>
          <Button 
            onClick={hideModal}
            type="danger"
          >
            取消
          </Button>
        </FooterToolbar>
      </Drawer>
    )
  }
}

export default Create