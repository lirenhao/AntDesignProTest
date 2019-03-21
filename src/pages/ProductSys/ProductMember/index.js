import React from 'react'
import { connect } from 'dva'
import {
  Layout,
  Card,
  Tree,
  Menu,
  Dropdown,
  Table,
  Input,
  Divider,
  message,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import Create from './Create'
import Manager from './Manager'

@connect(({ productCategory, productMember, loading }) => ({
  categoryTree: productCategory.tree,
  list: productMember.list,
  loading: loading.models.productMember,
}))
class Assoc extends React.Component {

  state = {
    selectedKeys: [],
    title: '',
    isCreateShow: false,
    isUpdateShow: false,
    isManagerShow: false,
    currentId: '',
    info: {},
  }

  columns = [
    {
      title: '产品名称',
      dataIndex: 'productName',
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
      title: '评论',
      dataIndex: 'comments',
    },
    {
      title: '序列',
      dataIndex: 'sequenceNum',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
    },
    {
      title: '操作',
      render: (text, record) => (
        <React.Fragment>
          <a onClick={() => this.handleRemove(record)}>删除</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleUpdate(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleManager(record)}>管理</a>
        </React.Fragment>
      ),
    },
  ]

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'productCategory/tree',
      payload: {
        type: 'category', 
        id: 'productCategoryId', 
        pId: 'primaryParentCategoryId', 
        title: 'categoryName',
      },
    });
  }

  handleTreeSelect = (selectedKeys, e) => {
    const { dispatch } = this.props;
    const { value, title} = e.node.props.info
    this.setState({ selectedKeys, title })
    dispatch({
      type: 'productMember/fetch',
      payload: value,
    });
  }

  handleAddModal = (visible, currentId = '') => {
    this.setState({isCreateShow: visible, currentId})
  }

  handleAddForm = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productPrice/save',
      payload: {
        type: 'price',
        payload: {id: 'productPriceId', ...record},
      },
      callback: () => this.handleAddModal(false)
    });
  }

  handleRemove = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productPrice/remove',
      payload: {
        type: 'price',
        key: record.productPriceId,
      },
      callback: () => message.success('删除成功'),
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
      type: 'productPrice/update',
      payload: {
        type: 'price',
        key: record.productPriceId,
        payload: record,
      },
      callback: () => this.handleUpdateModal(false)
    });
  }

  handleManagerModal = (visible) => {
    this.setState({isManagerShow: visible})
  }

  handleManager = (record) => {
    console.log(record)
    this.handleManagerModal(true)
  }

  renderRightMenu(record) {
    return (
      <Menu>
        <Menu.Item onClick={() => this.handleAddModal(true, record.value)}>添加产品</Menu.Item>
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
      categoryTree,
      list,
      loading,
    } = this.props
    const { 
      selectedKeys,
      title,
      isCreateShow, 
      isUpdateShow,
      isManagerShow,
      currentId,
      info,
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
                {loop(categoryTree[0] ? categoryTree[0].children : [])}
              </Tree>
            </Card>
          </Layout.Sider>
          <Layout.Content>
            <Card title={title ? `【${title}】类别成员` : "产品类别成员"}>
              <Table
                loading={loading}
                dataSource={list}
                pagination={false}
                columns={this.columns}
              />
            </Card>
          </Layout.Content>
          <Create 
            visible={isCreateShow} 
            hideModal={() => this.handleAddModal(false)} 
            handleFormSubmit={this.handleAddForm}
            info={{productCategoryId: currentId}}
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
          />
        </Layout>
      </PageHeaderWrapper>
    )
  }
}

export default Assoc