import React from 'react'
import { connect } from 'dva'
import {
  Layout,
  Card,
  Tree,
  Menu,
  Dropdown,
  Form,
  Input,
  Radio,
  Button,
  message,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'

@connect(({ partyType, loading }) => ({
  list: partyType.list.roleType || [],
  info: partyType.info || {},
  loading: loading.models.partyType,
}))
@Form.create()
class Product extends React.Component {

  state = {
    selectedKeys: ["1"],
  }

  menu = (
    <Menu>
      <Menu.Item>添加</Menu.Item>
    </Menu>
  );

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'partyType/tree',
      payload: {
        type: 'roleType',
        id: 'roleTypeId',
        pId: 'parentTypeId',
      }
    });
    dispatch({
      type: 'partyType/findOne',
      payload: {
        type: 'roleType',
        key: '1',
      }
    });
  }

  handleTreeSelect = (selectedKeys, e) => {
    const { dispatch } = this.props;
    if(e.selected) {
      this.setState({ selectedKeys })
      dispatch({
        type: 'partyType/findOne',
        payload: {
          type: 'roleType',
          key: selectedKeys[0],
        }
      });
    }
  }

  handleRightClick = (e) => {
    console.log(e)
  }

  handleFormSubmit = (e) => {
    const { dispatch, form, info } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'partyType/edit',
          payload: {
            type: 'roleType',
            id: 'roleTypeId',
            pId: 'parentTypeId',
            isTree: true,
            key: info.roleTypeId,
            payload: values,
          },
          callback: () => {
            message.success('提交成功');
            form.resetFields();
          },
        });
      }
    });
  };

  renderRightMenu(title) {
    return (
      <Dropdown overlay={this.menu}>
        <span>{title}</span>
      </Dropdown>
    )
  }

  render() {
    const {
      form: { 
        getFieldDecorator,
      },
      list,
      info,
    } = this.props
    const { 
      selectedKeys,
    } = this.state

    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return <Tree.TreeNode key={item.roleTypeId} title={item.description}>{loop(item.children)}</Tree.TreeNode>;
      }
      return <Tree.TreeNode key={item.roleTypeId} title={item.description} />;
    })

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    
    return (
      <PageHeaderWrapper>
        <Layout>
          <Layout.Sider theme="light" width="200">
            <Card bordered={false}>
              <Input.Search style={{ marginBottom: 8 }} placeholder="Search" />
              <Tree 
                showLine
                blockNode
                onLoad={this.handleTreeLoad}
                selectedKeys={selectedKeys}
                onSelect={this.handleTreeSelect}
                onRightClick={this.handleRightClick}
              >
                {loop(list)}
              </Tree>
            </Card>
          </Layout.Sider>
          <Layout.Content>
            <Card title="角色类型">
              <Form onSubmit={this.handleFormSubmit} style={{ marginTop: 8 }}>
                <Form.Item {...formItemLayout} label='是否有表'>
                  {getFieldDecorator('hasTable', {
                    initialValue: info.hasTable,
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                    })(
                      <Radio.Group>
                        <Radio value="0">无</Radio>
                        <Radio value="1">有</Radio>
                      </Radio.Group>
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label='描述'>
                  {getFieldDecorator('description', {
                    initialValue: info.description,
                    rules: [
                      {
                        required: true,
                        message: '请输入描述',
                      },
                    ],
                  })(
                    <Input.TextArea
                      style={{ minHeight: 32 }}
                      placeholder='请输入'
                      rows={3}
                    />
                  )}
                </Form.Item>
                <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
                  <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
              </Form>
            </Card>
          </Layout.Content>
        </Layout>
      </PageHeaderWrapper>
    )
  }
}

export default Product