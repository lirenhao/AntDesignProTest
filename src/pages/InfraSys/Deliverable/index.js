import React from 'react'
import { connect } from 'dva'
import {
  Card,
  Table,
  Form,
  Row,
  Col,
  Input,
  TreeSelect,
  Button,
  Divider,
  message,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import Create from './Create'

import styles from '../table.less'

@connect(({ infra, type: sysType, loading }) => ({
  list: infra.list,
  type: sysType.deliverableType,
  typeTree: sysType.tree.deliverableType || [{}],
  loading: loading.models.deliverable,
}))
@Form.create()
class Product extends React.Component {

  state = {
    isCreateShow: false,
    isUpdateShow: false,
    info: {},
  }

  columns = [
    {
      title: '可交付成果名称',
      dataIndex: 'deliverableName',
    },
    {
      title: '可交付成果类型',
      dataIndex: 'deliverableTypeId',
      render: (id) => {
        const { type } = this.props
        return type[id] ? type[id].deliverableTypeName : null
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '最后修改时间',
      dataIndex: 'lastUpdatedStamp',
    },
    {
      title: '创建时间',
      dataIndex: 'createdStamp',
    },
    {
      title: '版本',
      dataIndex: 'version',
    },
    {
      title: '操作',
      render: (text, record) => (
        <React.Fragment>
          <a onClick={() => this.handleRemove(record)}>删除</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleUpdate(record)}>修改</a>
        </React.Fragment>
      ),
    },
  ]

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'infra/findAll',
      payload: {
        type: 'deliverable',
      }
    });
    dispatch({
      type: 'type/tree',
      payload: {
        type: 'deliverableType',
        id: 'deliverableTypeId',
        pId: 'parentTypeId',
        title: 'deliverableTypeName',
      }
    });
  }

  handleAddModal = (visible) => {
    this.setState({isCreateShow: visible})
  }

  handleAddForm = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'infra/save',
      payload: {
        type: 'deliverable',
        payload: {id: 'deliverableId', ...record},
      },
      callback: () => this.handleAddModal(false)
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
      type: 'infra/update',
      payload: {
        type: 'deliverable',
        key: record.deliverableId,
        payload: record,
      },
      callback: () => this.handleUpdateModal(false)
    });
  }

  handleRemove = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'infra/remove',
      payload: {
        type: 'deliverable',
        key: record.deliverableId,
      },
      callback: () => message.success('删除成功'),
    });
  }

  render() {
    const {
      loading,
      list,
      form: {
        getFieldDecorator
      },
      typeTree,
    } = this.props
    const { 
      isCreateShow, 
      isUpdateShow,
      info,
    } = this.state
    
    return (
      <PageHeaderWrapper title="可交付成果">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col md={8} sm={24}>
                    <Form.Item label="可交付成果类型">
                      {getFieldDecorator('deliverableTypeId')(
                        <TreeSelect
                          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                          placeholder="请选择"
                          treeDefaultExpandAll
                          treeData={typeTree[0] ? typeTree[0].children : []}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col md={8} sm={24}>
                    <Form.Item label="可交付成果名称">
                      {getFieldDecorator('deliverableName')(<Input placeholder="请输入" />)}
                    </Form.Item>
                  </Col>
                  <Col md={8} sm={24}>
                    <span className={styles.submitButtons}>
                      <Button type="primary" htmlType="submit">
                        查询
                      </Button>
                      <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                        重置
                      </Button>
                    </span>
                  </Col>
                </Row>
              </Form>
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleAddModal(true)}>
                新建
              </Button>
            </div>
            <Table
              loading={loading}
              dataSource={list}
              columns={this.columns}
              rowKey={record => record.deliverableId}
            />
          </div>
        </Card>
        <Create 
          visible={isCreateShow} 
          hideModal={() => this.handleAddModal(false)} 
          handleFormSubmit={this.handleAddForm}
          info={{}}
        />
        <Create 
          visible={isUpdateShow} 
          hideModal={() => this.handleUpdateModal(false)} 
          handleFormSubmit={this.handleUpdateForm}
          info={info}
        />
      </PageHeaderWrapper>
    )
  }
}

export default Product