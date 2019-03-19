import React from 'react'
import { connect } from 'dva'
import {
  Layout,
  Card,
  Tree,
  Form,
  Input,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import CategoryForm from './CategoryForm'
import FeatureForm from './FeatureForm'

import styles from './index.less'

@connect(({ productAssoc, loading }) => ({
  productAssoc,
  loading: loading.models.product,
}))
@Form.create()
class Product extends React.Component {

  state = {
    selectedKeys: ["1-1"],
  }

  handleTreeSelect = (selectedKeys, e) => {
    console.log(selectedKeys, e)
    if(e.selected) {
      this.setState({ selectedKeys }) 
    }
  }

  handleRightClick = (e) => {
    console.log(e)
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props
    const { selectedKeys } = this.state

    return (
      <PageHeaderWrapper title="产品关联">
        <Layout>
          <Layout.Sider theme="light" width="200" className={styles.fixSiderBar}>
            <Card bordered={false}>
              <Input.Search style={{ marginBottom: 8 }} placeholder="Search" />
              <Tree 
                showLine
                blockNode
                defaultExpandAll
                selectedKeys={selectedKeys}
                onSelect={this.handleTreeSelect}
                onRightClick={this.handleRightClick}
              >
                <Tree.TreeNode key="1" title="自由套餐">
                  <Tree.TreeNode key="1-1" title="产品11"></Tree.TreeNode>
                </Tree.TreeNode>
                <Tree.TreeNode key="2" title="套餐A">
                  <Tree.TreeNode key="2-1" title="产品21"></Tree.TreeNode>
                </Tree.TreeNode>
                <Tree.TreeNode key="3" title="套餐B">
                  <Tree.TreeNode key="3-1" title="产品31"></Tree.TreeNode>
                </Tree.TreeNode>
              </Tree>
            </Card>
          </Layout.Sider>
          <Layout.Content>
            <Card title="产品类别">
              {getFieldDecorator('members', {
                initialValue: [{
                  key: '1',
                  workId: '00001',
                  name: 'John Brown',
                  department: 'New York No. 1 Lake Park',
                },
                {
                  key: '2',
                  workId: '00002',
                  name: 'Jim Green',
                  department: 'London No. 1 Lake Park',
                },],
              })(<CategoryForm />)}
            </Card>
            <Card title="产品特征">
              {getFieldDecorator('members', {
                initialValue: [{
                  key: '1',
                  workId: '00001',
                  name: 'John Brown',
                  department: 'New York No. 1 Lake Park',
                },
                {
                  key: '2',
                  workId: '00002',
                  name: 'Jim Green',
                  department: 'London No. 1 Lake Park',
                },],
              })(<FeatureForm />)}
            </Card>
            <Card title="产品价格">
              {getFieldDecorator('members', {
                initialValue: [{
                  key: '1',
                  workId: '00001',
                  name: 'John Brown',
                  department: 'New York No. 1 Lake Park',
                },
                {
                  key: '2',
                  workId: '00002',
                  name: 'Jim Green',
                  department: 'London No. 1 Lake Park',
                },],
              })(<FeatureForm />)}
            </Card>
          </Layout.Content>
        </Layout>
      </PageHeaderWrapper>
    )
  }
}

export default Product