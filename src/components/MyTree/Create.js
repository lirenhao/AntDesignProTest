import React from 'react'
import {
  Modal,
  Form,
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
      form: { getFieldDecorator },
      visible,
      hideModal,
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
    }

    return (
      <Modal 
        width="60%"
        bodyStyle={{ padding: '32px 40px 48px' }}
        title='新建'
        maskClosable={false}
        visible={visible}
        okText="提交"
        onOk={this.handleSubmit}
        onCancel={hideModal}
      >
        <Form>
          {Object.keys(formInfo).map(name => {
            return (<Item  key={name}
              {...formInfo[name]}
              name={name}
              value={info[name]}
              layout={formItemLayout}
              getFieldDecorator={getFieldDecorator}
            />)
          })}
        </Form>
      </Modal>
    )
  }
}

export default Create;