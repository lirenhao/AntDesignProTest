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
  list: infra.list.emplPosition,
  type: sysType.emplPositionType,
  typeTree: sysType.tree.emplPositionType || [{}],
  loading: loading.models.emplPosition,
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
      title: '职位名称',
      dataIndex: 'emplPositionName',
    },
    {
      title: '职位类型',
      dataIndex: 'emplPositionTypeId',
      render: (id) => {
        const { type } = this.props
        return type[id] ? type[id].emplPositionTypeName : null
      },
    },
    {
      title: '状态项',
      dataIndex: 'statusId',
    },
    {
      title: 'partyId',
      dataIndex: 'partyId',
    },
    {
      title: 'budgetId',
      dataIndex: 'budgetId',
    },
    {
      title: 'budgetItemSeqId',
      dataIndex: 'budgetItemSeqId',
    },
    {
      title: 'FromDate',
      dataIndex: 'estimatedFromDate',
    },
    {
      title: 'ThruDate',
      dataIndex: 'estimatedThruDate',
    },
    {
      title: 'SalaryFlag',
      dataIndex: 'isSalaryFlag',
    },
    {
      title: 'FulltimeFlag',
      dataIndex: 'isFulltimeFlag',
    },
    {
      title: '实际开始时间',
      dataIndex: 'actualFromDate',
    },
    {
      title: '实际终止时间',
      dataIndex: 'actualThruDate',
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
      fixed: 'right',
        width: 120,
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
        type: 'emplPosition',
      }
    });
    dispatch({
      type: 'type/tree',
      payload: {
        type: 'emplPositionType',
        id: 'emplPositionTypeId',
        pId: 'parentTypeId',
        title: 'emplPositionTypeName',
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
        type: 'emplPosition',
        payload: {
          ...record,
          id: 'emplPositionId',
          estimatedFromDate: record.estimatedFromDate.format('YYYY-MM-DD'),
          estimatedThruDate: record.estimatedThruDate.format('YYYY-MM-DD'),
          actualFromDate: record.actualFromDate.format('YYYY-MM-DD'),
          actualThruDate: record.actualThruDate.format('YYYY-MM-DD'),
        },
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
        type: 'emplPosition',
        key: record.emplPositionId,
        payload: {
          ...record,
          estimatedFromDate: record.estimatedFromDate.format('YYYY-MM-DD'),
          estimatedThruDate: record.estimatedThruDate.format('YYYY-MM-DD'),
          actualFromDate: record.actualFromDate.format('YYYY-MM-DD'),
          actualThruDate: record.actualThruDate.format('YYYY-MM-DD'),
        },
      },
      callback: () => this.handleUpdateModal(false)
    });
  }

  handleRemove = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'infra/remove',
      payload: {
        type: 'emplPosition',
        key: record.emplPositionId,
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
      <PageHeaderWrapper title="职位">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col md={8} sm={24}>
                    <Form.Item label="职位类型">
                      {getFieldDecorator('emplPositionTypeId')(
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
                    <Form.Item label="职位名称">
                      {getFieldDecorator('emplPositionName')(<Input placeholder="请输入" />)}
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
              rowKey={record => record.emplPositionId}
              scroll={{ x: 1800 }}
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