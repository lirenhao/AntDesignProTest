import React from 'react'
import { connect } from 'dva'
import { objToTree } from '@/utils/utils'
import MyTree from '@/components/MyTree'

const type = 'productType'
const id = 'productTypeId'
const pId = 'parentTypeId'
const title = 'productTypeName'
const header = '产品类型'

@connect(({ [type]: state }) => ({
  list: state.list
}))
class Type extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: `${type}/list`
    })
  }

  getInfo = (key) => {
    const { list } = this.props
    return {}
  }

  createSubmit = (record, callback) => {
    console.log(record)
  }

  updateSubmit = (record, callback) => {
    console.log(record)
  }

  removeSubmit = (key, callback) => {
    console.log(key)
  }

  render() {
    const { list } = this.props
    const tree = objToTree({[id]: '', [title]: '父级节点'}, list, id, pId, title)
    const formInfo = {
      parentTypeId: {
        type: 'treeSelect',
        label: '所属父级',
        treeData: [tree],
      },
      productTypeName: {
        type: 'input',
        label: '产品类型名称',
        rules: [
          {
            required: true,
            message: '请输入产品类型名称',
          },
        ]
      },
      isPhysical: {
        type: 'radio',
        label: '是否实物',
        rules: [
          {
            required: true,
            message: '请选择是否实物',
          },
        ],
        radios: {
            '0': '否',
            '1': '是',
        },
      },
      isDigital: {
        type: 'radio',
        label: '是否虚拟',
        rules: [
          {
            required: true,
            message: '请选择是否虚拟',
          },
        ],
        radios: {
          '0': '否',
          '1': '是',
        },
      },
      hasTable: {
        type: 'radio',
        label: '是否有表',
        rules: [
          {
            required: true,
            message: '请选择是否有表',
          },
        ],
        radios: {
          '0': '否',
          '1': '是',
        },
      },
      descript: {
        type: 'textArea',
        label: '描述'
      },
    }

    return (
      <MyTree 
        header={header}
        tree={[tree]} 
        formInfo={formInfo} 
        getInfo={this.getInfo}
        createSubmit={this.createSubmit} 
        updateSubmit={this.updateSubmit}
        removeSubmit={this.removeSubmit}
      />
    )
  }
}

export default Type