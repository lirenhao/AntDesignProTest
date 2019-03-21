import React from 'react'
import {
  Drawer,
  Tabs,
  Card,
  Form,

} from 'antd'
import Category from './Category'
import Feature from './Feature'

@Form.create()
class Manager extends React.Component {

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
      visible,
      hideModal,
      form: { getFieldDecorator },
    } = this.props

    return (
      <Drawer
        width="70%"
        destroyOnClose
        maskClosable={false}
        visible={visible}
        onClose={hideModal}
        style={{
          overflow: 'auto',
          height: 'calc(100% - 108px)',
          paddingBottom: '108px',
        }}
      >
        <Tabs>
          <Tabs.TabPane tab="产品类别" key="1">
            <Card title="产品类别" bordered={false}>
              {getFieldDecorator('categorys', {
                initialValue: [{
                  key: '1',
                  productCategoryId: '1',
                  productId: '1',
                  fromDate: '2019-03-19',
                  thruDate: '2019-03-19',
                  comments: 'comments',
                  sequenceNum: '1',
                  quantity: '1',
                },
                {
                  key: '2',
                  productCategoryId: '2',
                  productId: '1',
                  fromDate: '2019-03-19',
                  thruDate: '2019-03-19',
                  comments: 'comments',
                  sequenceNum: '2',
                  quantity: '1',
                },],
              })(<Category />)}
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab="产品特征" key="2">
            <Card title="产品特征" bordered={false}>
              {getFieldDecorator('features', {
                initialValue: [{
                  key: '1',
                  productId: '1',
                  productFeatureId: '颜色',
                  productFeatureApplTypeId: '必备特征',
                  fromDate: '2019-03-19',
                  thruDate: '2019-03-19',
                  sequenceNum: '1',
                  amount: '1.00',
                  workId: '00001',
                  name: 'John Brown',
                  department: 'New York No. 1 Lake Park',
                },
                {
                  key: '2',
                  productId: '1',
                  productFeatureId: '大小',
                  productFeatureApplTypeId: '必备特征',
                  fromDate: '2019-03-19',
                  thruDate: '2019-03-19',
                  sequenceNum: '2',
                  amount: '1.00',
                  workId: '00002',
                  name: 'Jim Green',
                  department: 'London No. 1 Lake Park',
                },],
              })(<Feature />)}
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab="产品价格" key="3">
            <Card title="产品价格" bordered={false}>
              {getFieldDecorator('prices', {
                initialValue: [],
              })(<Feature />)}
            </Card>
          </Tabs.TabPane>
        </Tabs>
      </Drawer>
    );
  }
}

export default Manager

