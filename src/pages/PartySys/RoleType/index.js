import React from 'react'
import { connect } from 'dva'
import {
  Layout,
  Card,
  Tree,
  Menu,
  Dropdown,
  Input,
  message,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import Form from './Form'
import Create from './Create'

@connect(({ partyType, loading }) => ({
  tree: partyType.tree.roleType || [],
  roleType: partyType.roleType,
  loading: loading.models.roleType,
}))
class RoleType extends React.Component {

  state = {
    expandedKeys: ["0-0"],
    selectedKeys: [],
    isCreateShow: false,
    parentTypeId: "",
    info: {},
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'partyType/tree',
      payload: {
        type: 'roleType',
        id: 'roleTypeId',
        pId: 'parentTypeId',
        title: 'description',
      }
    });
  }

  handleCreateModal = (visible, parentTypeId = "") => {
    this.setState({isCreateShow: visible, parentTypeId})
  }

  handleCreateForm = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'partyType/add',
      payload: {
        type: 'roleType',
        isTree: true,
        id: 'roleTypeId',
        pId: 'parentTypeId',
        title: 'description',
        payload: values,
      },
      callback: () =>  {
        this.handleCreateModal(false)
      },
    });
  }

  handleTreeSelect = (selectedKeys, e) => {
    const { roleType } = this.props
    const key = e.node.props.eventKey
    this.setState({selectedKeys, info: { ...roleType[key], key }})
  }

  handleTreeExpand = (expandedKeys) => {
    this.setState({expandedKeys})
  }

  handleUpdateForm = (record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'partyType/edit',
      payload: {
        type: 'roleType',
        isTree: true,
        id: 'roleTypeId',
        pId: 'parentTypeId',
        title: 'description',
        key: record.key,
        payload: record,
      },
      callback: () => {
        this.setState({ info: record})
        message.success('提交成功')
      },
    });
  }

  handleRemove = (key) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'partyType/remove',
      payload: {
        type: 'roleType',
        key,
        isTree: true,
        id: 'roleTypeId',
        pId: 'parentTypeId',
        title: 'description',
      },
      callback: () => {
        message.success('删除成功')
      },
    });
  }

  renderRightMenu(record) {
    if(record.children && record.children.length){
      return (
        <Menu>
          <Menu.Item onClick={() => this.handleCreateModal(true, record.value)}>添加节点</Menu.Item>
        </Menu>
      )
    }
    return (
      <Menu>
        <Menu.Item onClick={() => this.handleCreateModal(true, record.value)}>添加节点</Menu.Item>
        <Menu.Item onClick={() => this.handleRemove(record.value)}>删除节点</Menu.Item>
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
      tree,
    } = this.props
    const { 
      expandedKeys,
      selectedKeys,
      isCreateShow,
      parentTypeId,
      info,
    } = this.state

    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return (
          <Tree.TreeNode key={item.value} title={this.renderTreeTitle(item)} info={item}>
            {loop(item.children)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode key={item.value} title={this.renderTreeTitle(item)} info={item} />;
    })

    return (
      <PageHeaderWrapper title="角色类型">
        <Layout>
          <Layout.Sider theme="light" width="200">
            <Card bordered={false}>
              <Input.Search style={{ marginBottom: 8 }} placeholder="Search" />
              <Tree 
                showLine
                expandedKeys={expandedKeys}
                selectedKeys={selectedKeys}
                onExpand={this.handleTreeExpand}
                onSelect={this.handleTreeSelect}
              >
                {loop(tree)}
              </Tree>
            </Card>
          </Layout.Sider>
          <Layout.Content>
            <Card title="角色类型编辑">
              <Form 
                info={info}
                tree={tree}
                handleFormSubmit={this.handleUpdateForm}
              />
            </Card>
            <Create 
              visible={isCreateShow} 
              hideModal={() => this.handleCreateModal(false)} 
              handleFormSubmit={this.handleCreateForm}
              info={{parentTypeId}}
              tree={tree}
            />
          </Layout.Content>
        </Layout>
      </PageHeaderWrapper>
    )
  }
}

export default RoleType