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

const type = 'dataResourceType'
const id = 'dataResourceTypeId'
const pId = 'parentTypeId'
const title = 'dataResourceTypeName'
const header = '数据资源类型'

@connect(({ type: sysType, loading }) => ({
  sysType,
  tree: sysType.tree[type] || [],
  loading: loading.models[type],
}))
class Type extends React.Component {

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
      type: 'type/tree',
      payload: {
        type,
        id,
        pId,
        title,
      }
    });
  }

  handleCreateModal = (visible, parentTypeId = "") => {
    this.setState({isCreateShow: visible, parentTypeId})
  }

  handleCreateForm = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'type/add',
      payload: {
        type,
        id,
        pId,
        title,
        isTree: true,
        payload: {
          ...values,
          id,
        },
      },
      callback: () =>  {
        this.handleCreateModal(false)
      },
    });
  }

  handleTreeSelect = (selectedKeys, e) => {
    const { sysType } = this.props
    const key = e.node.props.eventKey
    this.setState({selectedKeys, info: { ...sysType[type][key], key }})
  }

  handleTreeExpand = (expandedKeys) => {
    this.setState({expandedKeys})
  }

  handleUpdateForm = (record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'type/edit',
      payload: {
        isTree: true,
        type,
        id,
        pId,
        title,
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
      type: 'type/remove',
      payload: {
        type,
        id,
        pId,
        title,
        key,
        isTree: true,
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
      <PageHeaderWrapper title={header}>
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
            <Card title={`${header}编辑`}>
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

export default Type