import React from 'react'
import {
  Drawer,
  Tabs,
  Card,
} from 'antd'
import Iactn from './Iactn'
import Apply from './Apply'
import Price from './Price'

function Manager(props) {
  const { visible, hideModal, productCategoryId, productId } = props
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
            <Iactn productCategoryId={productCategoryId} productId={productId} />
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="产品特征适用性" key="2">
          <Card title="产品特征适用性" bordered={false}>
            <Apply productCategoryId={productCategoryId} productId={productId} />
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="产品定价" key="3">
          <Card title="产品定价" bordered={false}>
            <Price productCategoryId={productCategoryId} productId={productId} />
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </Drawer>
  )
}

export default Manager

