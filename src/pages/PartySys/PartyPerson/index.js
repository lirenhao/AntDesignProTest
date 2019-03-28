import React from 'react'
import { connect } from 'dva'
import {
  Card,
  Table,
  Form,
  Button,
  Divider,
  message,
} from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import Create from './Create'

import styles from '../table.less'

@connect(({ party, type: sysType, loading }) => ({
  list: party.list.partyPerson,
  idType: sysType.partyIdentificationType,
  loading: loading.models.partyPerson,
}))
@Form.create()
class PartyPerson extends React.Component {

  state = {
    isCreateShow: false,
    isUpdateShow: false,
    info: {},
  }

  columns = [
    {
      title: '首姓名',
      dataIndex: 'firstName',
    },
    {
      title: '中间姓名',
      dataIndex: 'middleName',
    },
    {
      title: '最后姓名',
      dataIndex: 'lastName',
    },
    {
      title: '头衔',
      dataIndex: 'personalTitle',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '性别',
      dataIndex: 'genderTypeId',
      render: (id) => {
        if(id === '0') return '女'
        if(id === '1') return '男'
        if(id === '2') return '未知'
        return ''
      }
    },
    {
      title: '出生日期',
      dataIndex: 'birthDate',
    },
    {
      title: '婚姻状况',
      dataIndex: 'maritalStatus',
      render: (id) => {
        if(id === '0') return '未婚'
        if(id === '1') return '已婚'
        if(id === '2') return '未知'
        return ''
      }
    },
    {
      title: '证件类型',
      dataIndex: 'defaultPartyIdentificationTypeId',
      render: (id) => {
        const { idType } = this.props
        const data = idType[id] || {}
        return data.partyIdentificationTypeName
      }
    },
    {
      title: '工作年限',
      dataIndex: 'totalYearsWorkExperience',
    },
    {
      title: '雇佣状态',
      dataIndex: 'employmentStatusId',
    },
    {
      title: '居住状态',
      dataIndex: 'residenceStatusId',
    },
    {
      title: '操作',
      fixed: 'right',
      width: 110,
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
      type: 'party/findAll',
      payload: {
        type: 'partyPerson',
      }
    });
    dispatch({
      type: 'type/tree',
      payload: {
        type: 'partyIdentificationType',
        id: 'partyIdentificationTypeId',
        pId: 'parentTypeId',
        title: 'partyIdentificationTypeName',
      }
    });
  }

  handleAddModal = (visible) => {
    this.setState({isCreateShow: visible})
  }

  handleAddForm = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'party/save',
      payload: {
        type: 'partyPerson',
        payload: {id: 'partyId', ...record},
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
      type: 'party/update',
      payload: {
        type: 'partyPerson',
        key: record.partyId,
        payload: record,
      },
      callback: () => this.handleUpdateModal(false)
    });
  }

  handleRemove = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'party/remove',
      payload: {
        type: 'partyPerson',
        key: record.partyId,
      },
      callback: () => message.success('删除成功'),
    });
  }

  render() {
    const {
      loading,
      list,
    } = this.props
    const { 
      isCreateShow, 
      isUpdateShow,
      info,
    } = this.state
    
    return (
      <PageHeaderWrapper title="个人信息">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleAddModal(true)}>
                新建
              </Button>
            </div>
            <Table
              loading={loading}
              dataSource={list}
              columns={this.columns}
              rowKey={record => record.partyId}
              scroll={{ x: 1500 }}
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

export default PartyPerson