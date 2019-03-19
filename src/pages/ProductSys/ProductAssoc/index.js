import React from 'react'
import { connect } from 'dva'
import {
  Layout,
  Card,
  Tree,
  Menu,
  Dropdown,
  Tabs,
  Form,
  Input,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import DescriptionList from '@/components/DescriptionList'
import Category from './Category'
import Feature from './Feature'

import styles from './index.less'

const { Description } = DescriptionList

@connect(({ productAssoc, loading }) => ({
  productAssoc,
  loading: loading.models.product,
}))
@Form.create()
class Product extends React.Component {

  state = {
    selectedKeys: ["1-1"],
  }

  menu = (
    <Menu>
      <Menu.Item>
        添加产品
      </Menu.Item>
    </Menu>
  );

  handleTreeSelect = (selectedKeys, e) => {
    console.log(selectedKeys, e)
    if(e.selected) {
      this.setState({ selectedKeys }) 
    }
  }

  handleRightClick = (e) => {
    console.log(e)
  }

  renderRightMenu(title) {
    return (
      <Dropdown overlay={this.menu}>
        <span>{title}</span>
      </Dropdown>
    )
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props
    const { selectedKeys } = this.state

    return (
      <PageHeaderWrapper>
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
                <Tree.TreeNode key="1" title={this.renderRightMenu("自由套餐")}>
                  <Tree.TreeNode key="1-1" title={this.renderRightMenu("产品11")}></Tree.TreeNode>
                </Tree.TreeNode>
                <Tree.TreeNode key="2" title={this.renderRightMenu("套餐A")}>
                  <Tree.TreeNode key="2-1" title={this.renderRightMenu("产品21")}></Tree.TreeNode>
                </Tree.TreeNode>
                <Tree.TreeNode key="3" title={this.renderRightMenu("套餐B")}>
                  <Tree.TreeNode key="3-1" title={this.renderRightMenu("产品31")}></Tree.TreeNode>
                </Tree.TreeNode>
              </Tree>
            </Card>
          </Layout.Sider>
          <Layout.Content>
            <Card title="产品信息">
              <DescriptionList>
                <Description term="产品类型">服务</Description>
                <Description term="产品主类别">产品用途类别</Description>
                <Description term="产品描述">公司新设立</Description>
              </DescriptionList>
            </Card>
            <Card>
              <Tabs>
                <Tabs.TabPane tab="产品类别" key="1">
                  <Card title="产品类别" bordered={false}>
                    {getFieldDecorator('categorys', {
                      initialValue: [{
                        key: '1',
                        productCategoryId: '1',
                        productId: '1',
                        fromDate: '2019-03-19',
                        thruDate: '2019-03-19',
                        comments: 'comments',
                        sequenceNum: '1',
                        quantity: '1',
                      },
                      {
                        key: '2',
                        productCategoryId: '2',
                        productId: '1',
                        fromDate: '2019-03-19',
                        thruDate: '2019-03-19',
                        comments: 'comments',
                        sequenceNum: '2',
                        quantity: '1',
                      },],
                    })(<Category />)}
                  </Card>
                </Tabs.TabPane>
                <Tabs.TabPane tab="产品特征" key="2">
                  <Card title="产品特征" bordered={false}>
                    {getFieldDecorator('features', {
                      initialValue: [{
                        key: '1',
                        productId: '1',
                        productFeatureId: '颜色',
                        productFeatureApplTypeId: '必备特征',
                        fromDate: '2019-03-19',
                        thruDate: '2019-03-19',
                        sequenceNum: '1',
                        amount: '1.00',
                        workId: '00001',
                        name: 'John Brown',
                        department: 'New York No. 1 Lake Park',
                      },
                      {
                        key: '2',
                        productId: '1',
                        productFeatureId: '大小',
                        productFeatureApplTypeId: '必备特征',
                        fromDate: '2019-03-19',
                        thruDate: '2019-03-19',
                        sequenceNum: '2',
                        amount: '1.00',
                        workId: '00002',
                        name: 'Jim Green',
                        department: 'London No. 1 Lake Park',
                      },],
                    })(<Feature />)}
                  </Card>
                </Tabs.TabPane>
                <Tabs.TabPane tab="产品价格" key="3">
                  <Card title="产品价格" bordered={false}>
                    {getFieldDecorator('prices', {
                      initialValue: [],
                    })(<Feature />)}
                  </Card>
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Layout.Content>
        </Layout>
      </PageHeaderWrapper>
    )
  }
}

export default Product