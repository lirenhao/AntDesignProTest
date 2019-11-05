import React from 'react';
import { connect } from 'dva';
import { Form, TreeSelect, Button } from 'antd';
import { objToTree } from '@/utils/utils';

import styles from './style.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ order, loading }) => ({
  productType: order.dict.productType,
  productCategoty: order.dict.productCategoty,
  loading: loading.models.orderCreateProductQuery,
}))
@Form.create()
class Query extends React.Component {
  handleSubmit = e => {
    const { handleNext, form, info } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        handleNext({ ...info, ...values });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      info,
      productType,
      productCategoty,
      loading,
    } = this.props;

    const typeTree = objToTree(
      { productTypeId: '', productTypeName: '父级节点' },
      productType.map(item => (item.parentTypeId ? item : { ...item, parentTypeId: '' })),
      'productTypeId',
      'parentTypeId',
      'productTypeName'
    ).children;

    const categotyTree = objToTree(
      { productCategoryId: '', productCategoryName: '父级节点' },
      productCategoty.map(item =>
        item.parentCategoryId ? item : { ...item, parentCategoryId: '' }
      ),
      'productCategoryId',
      'parentCategoryId',
      'productCategoryName'
    ).children;

    return (
      <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
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
        <Form.Item {...formItemLayout} label="产品类别">
          {getFieldDecorator('productCategotyId', {
            initialValue: info.productCategotyId,
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
        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <Button type="primary" onClick={this.handleSubmit} loading={loading}>
            下一步
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Query;
