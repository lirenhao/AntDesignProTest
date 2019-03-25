import React from 'react'
import { connect } from 'dva'
import {
  Layout,
  Card,
  Tree,
  Empty,
  Input,
  message,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import Form from './Form'

@connect(({ type: sysType, loading }) => ({
  emplPositionTypeTree: sysType.tree.emplPositionType || [{children: []}],
  loading: loading.models.validResponsibility,
}))
class Category extends React.Component {

  state = {
    expandedKeys: ["0-0"],
    selectedKeys: [],
    emplPositionTypeId: "",
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'type/tree',
      payload: {
        type: 'emplPositionType', 
        id: 'emplPositionTypeId', 
        pId: 'parentTypeId',  
        title: 'emplPositionTypeName', 
      },
    });
  }

  handleTreeSelect = (selectedKeys, e) => {
    const { dispatch } = this.props;
    const key = e.node.props.eventKey
    if (e.selected) {
      this.setState({selectedKeys, emplPositionTypeId: key})
      dispatch({
        type: 'infra/findByUnionId',
        payload: {
          type: 'validResponsibility',
          key,
        },
        callback: () => message.success('添加成功'),
      });
    }
  }

  render() {
    const {
      emplPositionTypeTree,
    } = this.props
    const { 
      expandedKeys,
      selectedKeys,
      emplPositionTypeId,
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
      <PageHeaderWrapper title="有效的职责">
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
                {loop(emplPositionTypeTree[0].children)}
              </Tree>
            </Card>
          </Layout.Sider>
          <Layout.Content>
            <Card title="有效的职责列表">
              {emplPositionTypeId === "" ? (<Empty description="点击节点" />) : (<Form emplPositionTypeId={emplPositionTypeId} />)}
            </Card>
          </Layout.Content>
        </Layout>
      </PageHeaderWrapper>
    )
  }
}

export default Category