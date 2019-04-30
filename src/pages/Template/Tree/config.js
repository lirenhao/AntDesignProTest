import { objToTree } from '@/utils/utils';

export default {
  productType: {
    header: '产品类型',
    genKey: record => record.productTypeId,
    listToTree: list => [
      objToTree(
        { productTypeId: '', productTypeName: '父级节点' },
        list,
        'productTypeId',
        'parentTypeId',
        'productTypeName'
      ),
    ],
    queryFileds: [
      'productTypeId',
      'parentTypeId',
      'productTypeName',
      'isPhysical',
      'isDigital',
      'hasTable',
      'description',
    ],
    mutateFileds: [
      'parentTypeId',
      'productTypeName',
      'isPhysical',
      'isDigital',
      'hasTable',
      'description',
    ],
    formInfo: {
      parentTypeId: {
        type: 'treeSelect',
        label: '所属父级',
      },
      productTypeName: {
        type: 'input',
        label: '产品类型名称',
        rules: [
          {
            required: true,
            message: '请输入产品类型名称',
          },
        ],
      },
      isPhysical: {
        type: 'switch',
        label: '是否实物',
        rules: [
          {
            required: true,
            message: '请选择是否实物',
          },
        ],
      },
      isDigital: {
        type: 'switch',
        label: '是否虚拟',
        rules: [
          {
            required: true,
            message: '请选择是否虚拟',
          },
        ],
      },
      hasTable: {
        type: 'switch',
        label: '是否有表',
        rules: [
          {
            required: true,
            message: '请选择是否有表',
          },
        ],
      },
      description: {
        type: 'textArea',
        label: '描述',
      },
    },
  },
  productAssocType: {},
};
