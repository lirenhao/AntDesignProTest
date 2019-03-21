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

const type = 'category'
const id = 'productCategoryId'
const pId = 'primaryParentCategoryId'
const title = 'categoryName'
const header = '产品类别'

@connect(({ productCategory, productType, loading }) => ({
  tree: productCategory.tree,
  info: productCategory.info || {},
  categoryType: productType.categoryType,
  loading: loading.models.productCategory,
}))
class Category extends React.Component {

  state = {
    expandedKeys: ["0-0"],
    selectedKeys: [],
    isCreateShow: false,
    parentId: "",
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'productCategory/tree',
      payload: {
        type, 
        id, 
        pId, 
        title
      },
    });
  }

  handleCreateModal = (visible, parentId = "") => {
    this.setState({isCreateShow: visible, parentId})
  }

  handleCreateForm = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productCategory/save',
      payload: {
        type,
        id,
        pId,
        title,
        payload: {id, ...record},
      },
      callback: () =>  this.handleCreateModal(false),
    });
  }

  handleTreeSelect = (selectedKeys, e) => {
    const { dispatch } = this.props;
    const key = e.node.props.eventKey
    this.setState({selectedKeys})
    dispatch({
      type: 'productCategory/findOne',
      payload: {type, key},
      callback: () => message.success('添加成功'),
    });
  }

  handleTreeExpand = (expandedKeys) => {
    this.setState({expandedKeys})
  }

  handleUpdateForm = (record) => {
    const { dispatch } = this.props
    dispatch({
      type: 'productCategory/update',
      payload: {
        type,
        id,
        pId,
        title,
        key: record[id],
        payload: record,
      },
      callback: () => message.success('编辑成功'),
    });
  }

  handleRemove = (key) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productCategory/remove',
      payload: {
        type,
        id,
        pId,
        title,
        key,
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
      info,
    } = this.props
    const { 
      expandedKeys,
      selectedKeys,
      isCreateShow,
      parentId,
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
              info={{[pId]: parentId}}
              tree={tree}
            />
          </Layout.Content>
        </Layout>
      </PageHeaderWrapper>
    )
  }
}

export default Category