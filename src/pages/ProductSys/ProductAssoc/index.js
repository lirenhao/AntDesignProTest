import React from 'react'
import { connect } from 'dva'
import {
  Layout,
  Card,
  Tree,
  Input,
  message,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import Form from './Form'

@connect(({ productType, loading }) => ({
  assocTypeTree: productType.tree.assocType || [{children: []}],
  loading: loading.models.productAssoc,
}))
class Category extends React.Component {

  state = {
    expandedKeys: ["0-0"],
    selectedKeys: [],
    assocTypeId: "",
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'productType/tree',
      payload: {
        type: 'assocType', 
        id: 'productAssocTypeId', 
        pId: 'parentTypeId',  
        title: 'description', 
      },
    });
  }

  handleTreeSelect = (selectedKeys, e) => {
    const { dispatch } = this.props;
    const key = e.node.props.eventKey
    this.setState({selectedKeys, assocTypeId: key})
    dispatch({
      type: 'productCategory/findOne',
      payload: key,
      callback: () => message.success('添加成功'),
    });
  }

  render() {
    const {
      assocTypeTree,
    } = this.props
    const { 
      expandedKeys,
      selectedKeys,
      assocTypeId
    } = this.state

    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return (
          <Tree.TreeNode key={item.value} title={item.title}>
            {loop(item.children)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode key={item.value} title={item.title} />;
    })
    
    return (
      <PageHeaderWrapper title="产品关联">
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
                {loop(assocTypeTree[0].children)}
              </Tree>
            </Card>
          </Layout.Sider>
          <Layout.Content>
            <Card title="产品关联列表">
              {assocTypeId === "" ? null : (<Form assocTypeId={assocTypeId} />)}
            </Card>
          </Layout.Content>
        </Layout>
      </PageHeaderWrapper>
    )
  }
}

export default Category