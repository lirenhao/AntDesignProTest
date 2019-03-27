import React from 'react'
import { connect } from 'dva'
import {
  Layout,
  Card,
  Tree,
  Empty,
  Menu,
  Dropdown,
  Input,
  Divider,
  Table,
  message,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import Create from './Create'
import Manager from './Manager'

@connect(({ party, infra, type: sysType, loading }) => ({
  partyGroupList: party.list.partyGroup || [],
  partyGroupTree: party.tree.partyGroup || [],
  emplPositionList: infra.list.emplPosition,
  emplPositionType: sysType.emplPositionType,
  loading: loading.models.groupManager,
}))
class Party extends React.Component {

  state = {
    selectedKeys: [],
    isCreateShow: false,
    isUpdateShow: false,
    isManagerShow: false,
    partyId: '',
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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'party/tree',
      payload: {
        type: 'partyGroup', 
        id: 'partyId', 
        pId: 'parentId', 
        title: 'groupName',
      },
    });
  }

  handleTreeSelect = (selectedKeys, e) => {
    const { dispatch } = this.props;
    const { value } = e.node.props.info
    this.setState({ selectedKeys, partyId: value })
    dispatch({
      type: 'infra/findByField',
      payload: {
        type: 'emplPosition',
        params: {
          partyId: value,
        }
      }
    });
  }

  handleCreateModal = (visible, partyId = '') => {
    this.setState({isCreateShow: visible, partyId})
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

  renderRightMenu(record) {
    return (
      <Menu>
        <Menu.Item onClick={() => this.handleCreateModal(true, record.value)}>添加组织</Menu.Item>
        <Menu.Item onClick={() => this.handleCreateModal(true, record.value)}>添加职位</Menu.Item>
      </Menu>
    )
  }

  renderTreeTitle(record) {
    return (
      <Dropdown overlay={this.renderRightMenu(record)} trigger={['contextMenu']}>
        <span>{record.title}</span>
      </Dropdown>
    )
  }

  render() {
    const {
      partyGroupTree,
      emplPositionList,
      loading,
    } = this.props
    const { 
      selectedKeys,
      partyId,
      isCreateShow,
      isUpdateShow,
      isManagerShow,
      info,
      emplPositionId,
    } = this.state

    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return <Tree.TreeNode key={item.value} title={this.renderTreeTitle(item)} info={item}>{loop(item.children)}</Tree.TreeNode>
      }
      return <Tree.TreeNode key={item.value} title={this.renderTreeTitle(item)} info={item} />
    })
    
    return (
      <PageHeaderWrapper>
        <Layout>
          <Layout.Sider theme="light" width="200">
            <Card bordered={false}>
              <Input.Search style={{ marginBottom: 8 }} placeholder="Search" />
              <Tree 
                showLine
                selectedKeys={selectedKeys}
                onSelect={this.handleTreeSelect}
              >
                {loop(partyGroupTree)}
              </Tree>
            </Card>
          </Layout.Sider>
          <Layout.Content>
            <Card title="组织职位列表">
              {partyId === "" ? (<Empty description="选择组织" />) : (
                <Table
                  loading={loading}
                  dataSource={emplPositionList}
                  columns={this.columns}
                  rowKey={record => record.emplPositionId}
                  scroll={{ x: 2000 }}
                />
              )}
            </Card>
          </Layout.Content>
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
        </Layout>
      </PageHeaderWrapper>
    )
  }
}

export default Party