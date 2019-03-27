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
  message,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import Create from './Create'
import Manager from './Manager'
import { objToTree } from '@/utils/utils'

@connect(({ party, loading }) => ({
  list: party.list.partyGroup || [],
  loading: loading.models.groupManager,
}))
class Party extends React.Component {

  state = {
    selectedKeys: [],
    isCreateShow: false,
    isUpdateShow: false,
    partyId: '',
    info: {},
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'party/findAll',
      payload: {
        type: 'partyGroup',
      },
    });
  }

  handleTreeSelect = (selectedKeys, e) => {
    const { dispatch } = this.props;
    const { value } = e.node.props.info
    this.setState({ selectedKeys, partyId: value })
    dispatch({
      type: 'party/findByUnionId',
      payload: {
        type: 'partyRelationship',
        unionId: value,
      }
    });
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

  handleCreate = (key, visible) => {
    this.setState({partyId: key, isCreateShow: visible})
  }

  handleCreateForm = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'party/save',
      payload: {
        type: 'partyGroup',
        payload: {
          ...record,
          id: 'partyId',
        },
      },
      callback: () => this.setState({ isCreateShow: false })
    });
  }

  handleUpdate = (key) => {
    const { list } = this.props
    const info = list.filter(item => item.partyId === key)[0] || {}
    this.setState({ info, isUpdateShow: true })
  }

  handleUpdateForm = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'party/update',
      payload: {
        type: 'partyGroup',
        key: record.partyId,
        payload: record,
      },
      callback: () => {
        this.setState({ isUpdateShow: false })
        message.success('编辑成功')
      },
    });
  }

  handleRemove = (key) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'party/remove',
      payload: {
        type: 'partyGroup',
        key,
      },
      callback: () => message.success('删除成功'),
    });
  }

  renderRightMenu(record) {
    if(record.children && record.children.length){
      return (
        <Menu>
          <Menu.Item onClick={() => this.handleCreate(record.value, true)}>添加组织</Menu.Item>
          <Menu.Item onClick={() => this.handleUpdate(record.value)}>编辑组织</Menu.Item>
        </Menu>
      )
    }
    return (
      <Menu>
        <Menu.Item onClick={() => this.handleCreate(record.value, true)}>添加组织</Menu.Item>
        <Menu.Item onClick={() => this.handleUpdate(record.value)}>编辑组织</Menu.Item>
        <Menu.Item onClick={() => this.handleRemove(record.value)}>删除组织</Menu.Item>
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
      list,
    } = this.props
    const { 
      selectedKeys,
      isCreateShow,
      isUpdateShow,
      info,
      partyId,
    } = this.state

    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return <Tree.TreeNode key={item.value} title={this.renderTreeTitle(item)} info={item}>{loop(item.children)}</Tree.TreeNode>
      }
      return <Tree.TreeNode key={item.value} title={this.renderTreeTitle(item)} info={item} />
    })
    
    const tree = [objToTree({ partyId: "", groupName: "父级节点" }, list, 'partyId', 'parentId', 'groupName')] || []

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
                {loop(tree)}
              </Tree>
            </Card>
          </Layout.Sider>
          <Layout.Content>
            <Card>
              {partyId === "" ? (<Empty description="选择组织" />) : (
                <Manager partyId={partyId} />
              )}
            </Card>
          </Layout.Content>
          <Create 
            visible={isCreateShow} 
            hideModal={() => this.setState({isCreateShow: false})} 
            handleFormSubmit={this.handleCreateForm}
            info={{parentId: partyId}}
            tree={tree}
          />
          <Create 
            visible={isUpdateShow} 
            hideModal={() => this.setState({isUpdateShow: false})} 
            handleFormSubmit={this.handleUpdateForm}
            info={info}
            tree={tree}
          />
        </Layout>
      </PageHeaderWrapper>
    )
  }
}

export default Party