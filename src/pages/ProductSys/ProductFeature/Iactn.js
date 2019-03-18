import React from 'react'
import { connect } from 'dva'
import {
  Modal,
  Card,
  Table,
  Divider,
  Popconfirm,
  Select,
  Input,
  Button,
} from 'antd'
import DescriptionList from '@/components/DescriptionList'

const { Description } = DescriptionList

const iactnTypes = {
  "1": {
    productFeatureIactnTypeId: "1",
    parentTypeId: "",
    hasTable: "0",
    description: "特征互作用之不兼容性",
    lastUpdatedStamp: "2019-03-17 11:39:38",
    createdStamp: "2019-03-17 10:39:38",
    version: "v1.0.0"
  },
  "2": {
    productFeatureIactnTypeId: "2",
    parentTypeId: "",
    hasTable: "0",
    description: "特征互作用之依赖性",
    lastUpdatedStamp: "2019-03-17 11:39:38",
    createdStamp: "2019-03-17 10:39:38",
    version: "v1.0.0"
  }
}

const dataSource = [
  {
    productFeatureId: '1',
    productFeatureIdTo: '1',
    productFeatureIactnTypeId: '1',
    version: 'v1.0.0',
  },
]

@connect(({ productFeature }) => ({
  list: productFeature.data.list,
  info: productFeature.info,
}))
class Iactn extends React.Component {

  index = 0

  state = {
    data: dataSource.map(item => {
      const value = {...item, key: this.index}
      this.index += 1
      return value
    }),
    loading: false,
  }

  handleSubmit = () => {
    const { handleFormSubmit } = this.props
    handleFormSubmit()
  }

  addRow = () => {
    const { info } = this.props
    const { data } = this.state
    const newData = [...data, {
      key: this.index,
      productFeatureId: info.productFeatureId,
      productFeatureIdTo: '1',
      productFeatureIactnTypeId: '1',
      version: 'v1.0.0',
      editable: true,
      isNew: true,
    }]
    this.index += 1
    this.setState({ data: newData })
  }

  cancel = (e, key) => {
    const { data } = this.state
    this.setState({
      data: data.map(item =>  item.key === key ? {...item, editable: false, isNew: false} : item),
    });
  }

  remove = (key) => {
    const { data } = this.state
    this.setState({ data: data.filter(item => item.key !== key) }) 
  }

  saveRow = (e, key) => {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      const { data } = this.state
      this.setState({
        loading: false,
        data: data.map(item =>  item.key === key ? {...item, editable: false, isNew: false} : item),
      });
    }, 500);
  }

  editRow = (e, key) => {
    e.persist();
    const { data } = this.state
    const target = data.filter(item => item.key === key)[0] || {};
    target.editable = true
    this.setState({
      data: data.map(item =>  item.key === key ? target : item),
    });
  }

  handleFieldChange = (e, fieldName, key) => {
    const { data } = this.state;
    const target = data.filter(item => item.key === key)[0] || {};
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data:  data.map(item =>  item.key === key ? target : item) });
    }
  }

  handleSelectChange = (value, fieldName, key) => {
    const { data } = this.state;
    const target = data.filter(item => item.key === key)[0] || {};
    if (target) {
      target[fieldName] = value;
      this.setState({ data:  data.map(item =>  item.key === key ? target : item) });
    }
  }

  render() {
    const {
      info,
      visible,
      hideModal,
      list,
    } = this.props
    const {
      data,
      loading,
    } = this.state
    const columns = [
      {
        title: '互作用产品特征',
        dataIndex: 'productFeatureIdTo',
        key: 'productFeatureIdTo',
        width: '30%',
        render: (id, record) => {
          if (record.editable) {
            return (
              <Select 
                value={id} 
                placeholder="请选择" 
                style={{ width: '100%' }}
                onChange={value => this.handleSelectChange(value, 'productFeatureIdTo', record.key)}
              >
                {list.map(item => (
                  <Select.Option value={item.productFeatureId}>
                    {item.description}
                  </Select.Option>
                ))}
              </Select>
            );
          }
          return list.reduce((a, b) => a.productFeatureId === id ? a : b, {}).description;
        },
      },
      {
        title: '产品特征互作用类型',
        dataIndex: 'productFeatureIactnTypeId',
        key: 'productFeatureIactnTypeId',
        width: '30%',
        render: (id, record) => {
          if (record.editable) {
            return (
              <Select 
                value={id} 
                placeholder="请选择" 
                style={{ width: '100%' }}
                onChange={value => this.handleSelectChange(value, 'productFeatureIactnTypeId', record.key)}
              >
                {Object.keys(iactnTypes).map(key => (
                  <Select.Option value={iactnTypes[key].productFeatureIactnTypeId}>
                    {iactnTypes[key].description}
                  </Select.Option>
                ))}
              </Select>
            );
          }
          return iactnTypes[id].description;
        },
      },
      {
        title: '版本号',
        dataIndex: 'version',
        key: 'version',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text} 
                placeholder="请输入"
                onChange={e => this.handleFieldChange(e, 'version', record.key)}
              />
            );
          }
          return text;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>取消</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.editRow(e, record.key)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ]  
    return (
      <Modal 
        width="60%"
        bodyStyle={{ padding: '32px 40px 48px' }}
        title='产品特征互作用'
        maskClosable={false}
        visible={visible}
        okText="提交"
        onOk={this.handleSubmit}
        onCancel={hideModal}
      >
        <Card bordered={false}>
          <DescriptionList size="large" title="产品特征">
            <Description term="ID">{info.productFeatureId}</Description>
            <Description term="描述">{info.description}</Description>
          </DescriptionList>
        </Card>
        <Card>
          <Table
            loading={loading}
            columns={columns}
            dataSource={data}
            pagination={false}
          />
          <Button
            style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
            type="dashed"
            onClick={this.addRow}
            icon="plus"
          >
            新增作用
          </Button>
        </Card>
      </Modal>
    )
  }
}

export default Iactn;