import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import {
  Button,
  Table,
  Divider,
  message,
} from 'antd'
import Create from './Create'
import Manager from './Manager'

@connect(({ infra, type: sysType, loading }) => ({
  emplPositionList: infra.list.emplPosition,
  emplPositionType: sysType.emplPositionType,
  statusItemList: infra.list.statusItem || [],
  loading: loading.models.groupManagerPosition,
}))
class Position extends Component {

  state = {
    isCreateShow: false,
    isUpdateShow: false,
    isManagerShow: false,
    info: {},
    emplPositionId: '',
  }

  columns = [
    {
      title: '职位名称',
      dataIndex: 'emplPositionName',
    },
    {
      title: '职位类型',
      dataIndex: 'emplPositionTypeId',
      render: (id) => {
        const { emplPositionType } = this.props
        return emplPositionType[id] ? emplPositionType[id].emplPositionTypeName : null
      },
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
      title: 'partyId',
      dataIndex: 'partyId',
    },
    {
      title: 'budgetId',
      dataIndex: 'budgetId',
    },
    {
      title: 'budgetItemSeqId',
      dataIndex: 'budgetItemSeqId',
    },
    {
      title: 'FromDate',
      dataIndex: 'estimatedFromDate',
    },
    {
      title: 'ThruDate',
      dataIndex: 'estimatedThruDate',
    },
    {
      title: 'SalaryFlag',
      dataIndex: 'isSalaryFlag',
      render: text => text === '1' ? '是' : '否',
    },
    {
      title: 'FulltimeFlag',
      dataIndex: 'isFulltimeFlag',
      render: text => text === '1' ? '是' : '否',
    },
    {
      title: '实际开始时间',
      dataIndex: 'actualFromDate',
    },
    {
      title: '实际终止时间',
      dataIndex: 'actualThruDate',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '最后修改时间',
      dataIndex: 'lastUpdatedStamp',
    },
    {
      title: '创建时间',
      dataIndex: 'createdStamp',
    },
    {
      title: '版本',
      dataIndex: 'version',
    },
    {
      title: '操作',
      fixed: 'right',
        width: 150,
      render: (text, record) => (
        <React.Fragment>
          <a onClick={() => this.handleRemove(record)}>删除</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleUpdate(record)}>修改</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleManager(record)}>管理</a>
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
      type: 'infra/save',
      payload: {
        type: 'emplPosition',
        payload: {
          ...record,
          id: 'emplPositionId',
          estimatedFromDate: record.estimatedFromDate.format('YYYY-MM-DD'),
          estimatedThruDate: record.estimatedThruDate.format('YYYY-MM-DD'),
          actualFromDate: record.actualFromDate.format('YYYY-MM-DD'),
          actualThruDate: record.actualThruDate.format('YYYY-MM-DD'),
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
      type: 'infra/update',
      payload: {
        type: 'emplPosition',
        key: record.emplPositionId,
        payload: {
          ...record,
          estimatedFromDate: record.estimatedFromDate.format('YYYY-MM-DD'),
          estimatedThruDate: record.estimatedThruDate.format('YYYY-MM-DD'),
          actualFromDate: record.actualFromDate.format('YYYY-MM-DD'),
          actualThruDate: record.actualThruDate.format('YYYY-MM-DD'),
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
      type: 'infra/remove',
      payload: {
        type: 'emplPosition',
        key: record.emplPositionId,
      },
      callback: () => message.success('删除成功'),
    });
  }

  handleManagerModal = (visible) => {
    this.setState({isManagerShow: visible})
  }

  handleManager = (record) => {
    this.setState({emplPositionId: record.emplPositionId})
    this.handleManagerModal(true)
  }

  render() {
    const {
      emplPositionList,
      loading,
      partyId,
    } = this.props
    const {
      isCreateShow,
      isUpdateShow,
      isManagerShow,
      info,
      emplPositionId,
    } = this.state

    return (
      <Fragment>
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={() => this.handleCreateModal(true)}
          icon="plus"
        >
          添加职位
        </Button>
        <Table
          loading={loading}
          dataSource={emplPositionList}
          columns={this.columns}
          rowKey={record => record.emplPositionId}
          scroll={{ x: 2000 }}
        />
        <Create 
          visible={isCreateShow} 
          hideModal={() => this.handleCreateModal(false)} 
          handleFormSubmit={this.handleCreateForm}
          info={{partyId}}
        />
        <Create 
          visible={isUpdateShow} 
          hideModal={() => this.handleUpdateModal(false)} 
          handleFormSubmit={this.handleUpdateForm}
          info={info}
        />
        <Manager 
          visible={isManagerShow} 
          hideModal={() => this.handleManagerModal(false)} 
          partyId={partyId}
          emplPositionId={emplPositionId}
        />
      </Fragment>
    )
  }
}

export default Position