import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import {
  Button,
  Table,
  Divider,
  message,
} from 'antd'
import Create from './Create'

@connect(({ party, type: sysType, infra, loading }) => ({
  list: party.list.partyRelationship,
  groupList: party.list.partyGroup || [],
  personList: party.list.partyPerson || [],
  roleType: sysType.roleType,
  statusItemList: infra.list.statusItem || [],
  loading: loading.models.groupManagerPosition,
}))
class Position extends Component {

  state = {
    isCreateShow: false,
    isUpdateShow: false,
    info: {},
  }

  columns = [
    {
      title: '源当事人',
      dataIndex: 'partyIdFrom',
      render: (id) => {
        const { groupList } = this.props
        const data = groupList.filter(item => item.partyId === id)[0] || {}
        return data.groupName
      }
    },
    {
      title: '源角色',
      dataIndex: 'roleTypeIdFrom',
      render: (id) => {
        const { roleType } = this.props
        return roleType[id] ? roleType[id].description : null
      },
    },
    {
      title: '目标当事人',
      dataIndex: 'partyIdTo',
      render: (id) => {
        const { personList } = this.props
        const data = personList.filter(item => item.partyId === id)[0] || {}
        return data.nickName
      }
    },
    {
      title: '目标角色',
      dataIndex: 'roleTypeIdTo',
      render: (id) => {
        const { roleType } = this.props
        return roleType[id] ? roleType[id].description : null
      },
    },
    {
      title: '开始日期',
      dataIndex: 'fromDate',
    },
    {
      title: '结束日期',
      dataIndex: 'thruDate',
    },
    {
      title: '状态项',
      dataIndex: 'statusId',
      render: (id) => {
        const { statusItemList } = this.props
        const data = statusItemList.filter(item => item.statusId === id)[0] || {}
        return data.statusCode
      },
    },
    {
      title: '关系名称',
      dataIndex: 'relationshipName',
    },
    {
      title: '操作',
      fixed: 'right',
        width: 120,
      render: (text, record) => (
        <React.Fragment>
          <a onClick={() => this.handleRemove(record)}>删除</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleUpdate(record)}>修改</a>
        </React.Fragment>
      ),
    },
  ]

  handleCreateModal = (visible) => {
    this.setState({isCreateShow: visible})
  }

  handleCreateForm = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'party/saveUnion',
      payload: {
        type: 'partyRelationship',
        payload: {
          ...record,
          key: `${record.partyIdFrom}-${record.partyIdTo}`,
          fromDate: record.fromDate.format('YYYY-MM-DD'),
          thruDate: record.thruDate.format('YYYY-MM-DD'),
        },
      },
      callback: () => this.handleCreateModal(false)
    });
  }

  handleUpdateModal = (visible) => {
    this.setState({isUpdateShow: visible})
  }

  handleUpdate = (record) => {
    this.setState({info: record})
    this.handleUpdateModal(true);
  }

  handleUpdateForm = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'party/update',
      payload: {
        type: 'partyRelationship',
        key: `${record.partyIdFrom}-${record.partyIdTo}`,
        payload: {
          ...record,
          fromDate: record.fromDate.format('YYYY-MM-DD'),
          thruDate: record.thruDate.format('YYYY-MM-DD'),
        },
      },
      callback: () => {
        this.handleUpdateModal(false)
        message.success('编辑成功')
      },
    });
  }

  handleRemove = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'party/remove',
      payload: {
        type: 'partyRelationship',
        key: `${record.partyIdFrom}-${record.partyIdTo}`,
        isUnion: true,
      },
      callback: () => message.success('删除成功'),
    });
  }

  render() {
    const {
      list,
      loading,
      partyId,
    } = this.props
    const {
      isCreateShow,
      isUpdateShow,
      info,
    } = this.state

    return (
      <Fragment>
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={() => this.handleCreateModal(true)}
          icon="plus"
        >
          添加用户
        </Button>
        <Table
          loading={loading}
          dataSource={list}
          columns={this.columns}
          rowKey={record => `${record.partyIdFrom}-${record.partyIdTo}`}
          scroll={{ x: 1000 }}
        />
        <Create 
          visible={isCreateShow} 
          hideModal={() => this.handleCreateModal(false)} 
          handleFormSubmit={this.handleCreateForm}
          info={{partyIdFrom: partyId}}
        />
        <Create 
          visible={isUpdateShow} 
          hideModal={() => this.handleUpdateModal(false)} 
          handleFormSubmit={this.handleUpdateForm}
          info={info}
        />
      </Fragment>
    )
  }
}

export default Position