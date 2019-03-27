import React from 'react'
import {
  Tabs,
} from 'antd'
import Person from './Person'
import Position from './Position'

function Manager(props) {
  const { partyId } = props
  return (
    <Tabs>
      <Tabs.TabPane tab="用户信息" key="1">
        <Person partyId={partyId} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="职位信息" key="2">
        <Position partyId={partyId} />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default Manager