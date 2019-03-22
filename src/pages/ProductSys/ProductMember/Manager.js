import React from 'react'
import {
  Drawer,
  Tabs,
  Card,
} from 'antd'
import Iactn from './Iactn'
import Feature from './Feature'

class Manager extends React.Component {

  handleSubmit = () => {

  }

  render() {
    const {
      visible,
      hideModal,
      productId,
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
          <Tabs.TabPane tab="产品特征互作用" key="1">
            <Card title="产品特征互作用" bordered={false}>
              <Iactn productId={productId} />
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab="产品特征适用性" key="2">
            <Card title="产品特征适用性" bordered={false}>
              <Feature productId={productId} />
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab="产品价格" key="3">
            <Card title="产品价格" bordered={false}>
              <Feature productId={productId} />
            </Card>
          </Tabs.TabPane>
        </Tabs>
      </Drawer>
    );
  }
}

export default Manager

