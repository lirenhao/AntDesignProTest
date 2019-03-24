import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import {
  Drawer,
  Form,
  Button,
} from 'antd'
import FooterToolbar from '@/components/FooterToolbar'

@Form.create()
class DrawerForm extends React.Component {

  static propTypes = {
    info: PropTypes.object,
    width: PropTypes.string,
    title: PropTypes.string,
    visible: PropTypes.bool,
    hideModal: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    info: {},
    width: '40%',
    title: '',
    visible: true,
    hideModal: () => {},
    onSubmit: () => {},
  };

  handleSubmit = e => {
    const { form, info, onSubmit } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit({ ...info,  ...values});
        form.resetFields();
      }
    });
  };

  rendre() {
    const { 
      width,
      title,
      visible,
      hideModal,
      children,
      loading,
    } = this.props;
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
          {children}
          <br />
          <br />
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

export default DrawerForm