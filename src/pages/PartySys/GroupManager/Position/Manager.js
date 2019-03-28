import React from 'react'
import {
  Drawer,
  Tabs,
  Card,
} from 'antd'
import Responsibility from './Responsibility'
import Fulfillment from './Fulfillment'
import Reporting from './Reporting'

function Manager(props) {
  const { visible, hideModal, partyId, emplPositionId } = props
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
        <Tabs.TabPane tab="职位职责" key="1">
          <Card title="职位职责" bordered={false}>
            <Responsibility emplPositionId={emplPositionId} />
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="职位履行" key="2">
          <Card title="职位履行" bordered={false}>
            <Fulfillment emplPositionId={emplPositionId} />
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="职位报告" key="3">
          <Card title="职位报告" bordered={false}>
            <Reporting emplPositionId={emplPositionId} />
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </Drawer>
  )
}

export default Manager