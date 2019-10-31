import React from 'react';
import { connect } from 'dva';
import { Drawer, Form, Button } from 'antd';
import Create from './Create';

@connect(({ loading }) => ({
  loading: loading.models.productPrice,
}))
@Form.create()
class Price extends React.Component {
  constructor(props) {
    super(props);
    // TODO 获取价格的数据结构
    this.state = {};
  }

  render() {
    const { title, visible, hideModal, product, info, loading } = this.props;

    return (
      <Drawer
        title={title}
        width="70%"
        destroyOnClose
        maskClosable={false}
        visible={visible}
        onClose={hideModal}
      >
        <Create product={product} info={info} />
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
          <Button onClick={this.handleSubmit} type="primary" loading={loading}>
            提交
          </Button>
        </div>
      </Drawer>
    );
  }
}

export default Price;
