import React from 'react'
import {
  Form,
  Button,
} from 'antd'
import Item from '@/components/MyTree/Item'

@Form.create()
class Create extends React.Component {

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
      formInfo,
      form: {
        getFieldDecorator
      },
      info,
      tree,
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
    
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    
    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
        {Object.keys(formInfo).map(name => {
          return (<Item key={name}
            {...formInfo[name]}
            name={name}
            value={info[name]}
            layout={formItemLayout}
            getFieldDecorator={getFieldDecorator}
          />)
        })}
        <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Create;