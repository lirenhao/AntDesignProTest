import React from 'react'
import { connect } from 'dva'
import {
  Layout,
  Card,
  Tree,
  Empty,
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
import { objToTree } from '@/utils/utils'

@connect(({ productMember, loading }) => ({
  productCategory: productMember.data.productCategory,
  productCategoryMember: productMember.data.productCategoryMember,
  loading: loading.models.productMember,
}))
class Assoc extends React.Component {

  state = {
    selectedKeys: [],
    memberList: [],
    title: '',
    isCreateShow: false,
    isUpdateShow: false,
    isManagerShow: false,
    currentId: '',
    info: {},
    productId: '',
  }

  columns = [
    {
      title: '产品名称',
      dataIndex: 'product.productName',
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
      type: 'productMember/fetch',
    });
  }

  handleTreeSelect = (selectedKeys, e) => {
    if(e.selected) {
      const { dispatch, productCategoryMember } = this.props;
      const { value, title} = e.node.props.info
      this.setState({ 
        selectedKeys, 
        title, 
        currentId: value,
        memberList: productCategoryMember.filter(item => item.productCategoryId === selectedKeys[0])
      })
    }
  }

  handleAddModal = (visible, currentId = '') => {
    this.setState({isCreateShow: visible, currentId})
  }

  handleAddForm = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productMember/save',
      payload: {
        ...record,
        fromDate: record.fromDate.format('YYYY-MM-DD'),
        thruDate: record.thruDate.format('YYYY-MM-DD'),
      },
      callback: () => {
        this.handleAddModal(false)
        message.success('新增成功')
      },
    });
  }

  handleRemove = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productMember/remove',
      payload: record,
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
      type: 'productMember/update',
      payload: {
        ...record,
        fromDate: record.fromDate.format('YYYY-MM-DD'),
        thruDate: record.thruDate.format('YYYY-MM-DD'),
      },
      callback: () => {
        this.handleUpdateModal(false)
        message.success('编辑成功')
      },
    });
  }

  handleManagerModal = (visible) => {
    this.setState({isManagerShow: visible})
  }

  handleManager = (record) => {
    this.setState({productId: record.productId})
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
      productCategory,
      loading,
    } = this.props
    const { 
      selectedKeys,
      memberList,
      title,
      isCreateShow, 
      isUpdateShow,
      isManagerShow,
      currentId,
      info,
      productId,
    } = this.state

    const categoryTree = objToTree({ productCategoryId: "", categoryName: "父级节点" }, 
      productCategory, "productCategoryId", "primaryParentCategoryId", "categoryName")

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
                {loop(categoryTree.children)}
              </Tree>
            </Card>
          </Layout.Sider>
          <Layout.Content>
            <Card title={title ? `【${title}】类别成员` : "产品类别成员"}>
              {currentId === "" ? (<Empty description="点击节点" />) : (
                <Table
                  loading={loading}
                  dataSource={memberList}
                  pagination={false}
                  columns={this.columns}
                  rowKey={record => record.productId}
                />
              )}
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
            productCategoryId={currentId}
            productId={productId}
          />
        </Layout>
      </PageHeaderWrapper>
    )
  }
}

export default Assoc