import React from 'react'
import { connect } from 'dva'
import {
  Layout,
  Card,
  Tree,
  Table,
  Input,
  Divider,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
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
    isManagerShow: false,
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
    const { eventKey: key, title} = e.node.props
    this.setState({ selectedKeys, title })
    dispatch({
      type: 'productMember/fetch',
      payload: key,
    });
  }

  handleManagerModal = (visible) => {
    this.setState({isManagerShow: visible})
  }

  handleMemberRow = (record) => {
    this.handleManager(record)
  }

  handleManager = (record) => {
    console.log(record)
    this.handleManagerModal(true)
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
      isManagerShow,
    } = this.state

    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return <Tree.TreeNode key={item.value} title={item.title}>{loop(item.children)}</Tree.TreeNode>
      }
      return <Tree.TreeNode key={item.value} title={item.title} />
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
                onRow={record => ({onClick: () => this.handleMemberRow(record)})}
              />
            </Card>
          </Layout.Content>
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