import React from 'react'
import { connect } from 'dva'
import {
  Layout,
  Card,
  Tree,
  Tabs,
  Form,
  Input,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import DescriptionList from '@/components/DescriptionList'
import Category from './Category'
import Feature from './Feature'

const { Description } = DescriptionList

@connect(({ productCategory, loading }) => ({
  categoryTree: productCategory.tree,
  loading: loading.models.productAssoc,
}))
@Form.create()
class Assoc extends React.Component {

  state = {
    selectedKeys: [],
  }

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
    console.log(selectedKeys, e)
    this.setState({ selectedKeys })
  }

  render() {
    const {
      form: { 
        getFieldDecorator 
      },
      categoryTree,
    } = this.props
    const { selectedKeys } = this.state

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
            <Card title="产品类别成员">
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

export default Assoc