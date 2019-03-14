import React from 'react';
import {
  Row,
  Col,
  Form,
  Select,
  Cascader,
  Transfer,
  Radio,
  Checkbox,
} from 'antd';

const options = [
  {
    value: '1',
    label: '开设公司',
    children: [{
      value: '1-1',
      label: '公司注册',
    },
    {
      value: '1-2',
      label: '注册地址',
    },
    {
      value: '1-3',
      label: '工位出租',
    },
  ]},
  {
    value: '2',
    label: '公司变更',
    children: [{
      value: '2-1',
      label: '公司变更',
    }],
  },
  {
    value: '3',
    label: '财务税务',
    children: [{
      value: '3-1',
      label: '代理记账',
    },
    {
      value: '3-2',
      label: '税务代办',
    },
    {
      value: '3-3',
      label: '银行开户',
    },
  ]},
  {
    value: '4',
    label: '人事社保',
    children: [{
      value: '4-4',
      label: '社保',
    }],
  },
  {
    value: '5',
    label: '公司注销',
    children: [{
      value: '5-1',
      label: '公司注销',
    }],
  },
  {
    value: '6',
    label: '行政许可',
    children: [{
      value: '6-1',
      label: '餐饮食品',
    },
    {
      value: '6-2',
      label: '销售贸易',
    },
    {
      value: '6-3',
      label: '其他资质',
    },
  ]},
  {
    value: '7',
    label: '组合套餐',
    children: [{
      value: '7-1',
      label: '餐饮套餐A：10699套餐食品',
    },
    {
      value: '7-2',
      label: '套餐B：8699套餐',
    },
    {
      value: '7-3',
      label: '自由组合套餐',
    },
  ]},
];

class DetailForm extends React.Component {
  state = {
    transferAble: false,
    dataSource: [],
    targetKeys: [],
    checkboxShow: 0,
  }

  handleCascaderChange = (value) => {
    if(value[1] === '1-1') {
      this.setState({ 
        transferAble: false,
        dataSource: [
          {
            key: '1-1-1',
            title: '内资有限公司注册',
            amt: 599,
          }, 
          {
            key: '1-1-2',
            title: '合伙企业注册',
            amt: 599,
          },
          {
            key: '1-1-3',
            title: '内资股份公司注册',
            amt: 599,
          },
          {
            key: '1-1-4',
            title: '外资公司注册',
            amt: 599,
          },
        ]
      })
    } else if(value[1] === '7-1') {
      this.setState({ 
        transferAble: true,
        dataSource: [
          {
            key: '7-1-1',
            title: '内资有限公司注册',
            amt: 599,
          }, 
          {
            key: '7-1-2',
            title: '工位出租',
            amt: 599,
          },
          {
            key: '7-1-3',
            title: '代理记账',
            amt: 599,
          },
          {
            key: '7-1-4',
            title: '劳务派遣许可证',
            amt: 599,
          },
        ],
        targetKeys: ['7-1-1', '7-1-2', '7-1-3', '7-1-4'],
      })
    } else {
      this.setState({ 
        transferAble: false,
        dataSource: []
      })
    }
  }

  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  }

  renderItem = (item) => {
    const customLabel = (
      <span>{item.key} {item.title} {item.amt}</span>
    );
    return {
      label: customLabel, // for displayed item
      value: item.title, // for title and filter matching
    };
  }

  handleRadioChange = (e) => {
    this.setState({ checkboxShow: e.target.value})
  }

  render() {
    const { formLayout, form } = this.props;
    const { transferAble, dataSource, targetKeys, checkboxShow } = this.state;
    return (
      <Row>
        <Col span={12}>
          <Form.Item key="khqy" {...formLayout} label="客户区域">
            {form.getFieldDecorator('khqy', {
              rules: [{ required: true, message: '请选择区域！' }],
              initialValue: "1",
            })(
              <Select style={{ width: '100%' }}>
                <Select.Option value="1">通州区</Select.Option>
                <Select.Option value="2">昌平区</Select.Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item key="kxfw" {...formLayout} label="可选服务">
            {form.getFieldDecorator('kxfw', {
              rules: [{ required: true, message: '请选择服务！' }]
            })(<Cascader options={options} placeholder="请选择" onChange={this.handleCascaderChange} />)}
          </Form.Item>
        </Col>
        <Col span={24} push={4}>
          <Transfer
            disabled={transferAble}
            dataSource={dataSource}
            titles={['可选服务', '已选服务']}
            listStyle={{
              width: 400,
              height: 300,
            }}
            targetKeys={targetKeys}
            onChange={this.handleChange}
            render={this.renderItem}
          />
        </Col>
        <Col span={12}>
          <Form.Item key="zsfw" {...formLayout} label="是否有赠送服务">
            {form.getFieldDecorator('zsfw', {
              initialValue: "0",
              rules: [{ required: true, message: '请选择是否有赠送服务！' }],
            })(
              <Radio.Group style={{ width: '100%' }} onChange={this.handleRadioChange}>
                <Radio value="0">无</Radio>
                <Radio value="1">有</Radio>
              </Radio.Group>
            )}
          </Form.Item>
        </Col>
        {
          checkboxShow === '1' ? (
            <Col span={12}>
              <Form.Item key="zsfwValue" {...this.formLayout}>
                {form.getFieldDecorator('zsfwValue', {
                })(
                  <Checkbox.Group style={{ width: '100%' }}>
                    <Checkbox value="1">银行开户</Checkbox>
                    <Checkbox value="2">国地税报道</Checkbox>
                    <Checkbox value="3">签三方</Checkbox>
                  </Checkbox.Group>
                )}
              </Form.Item>
            </Col>
          ): null
        }
      </Row>
    )
  }
}

export default DetailForm;