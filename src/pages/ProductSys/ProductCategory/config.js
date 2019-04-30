import { objToTree } from '@/utils/utils';

export default {
  type: 'productCategory',
  header: '产品类别',
  genKey: record => record.productCategoryId,
  listToTree: list => [
    objToTree(
      { productCategoryId: '', categoryName: '父级节点' },
      list,
      'productCategoryId',
      'primaryParentCategoryId',
      'categoryName'
    ),
  ],
  queryFileds: [
    'productCategoryId',
    'categoryName',
    'productCategoryTypeId',
    'primaryParentCategoryId',
    'description',
  ],
  mutateFileds: ['categoryName', 'productCategoryTypeId', 'primaryParentCategoryId', 'description'],
  formInfo: {
    categoryName: {
      type: 'input',
      label: '产品类别名称',
      rules: [
        {
          required: true,
          message: '请输入产品类别名称',
        },
      ],
    },
    productCategoryTypeId: {
      type: 'treeSelect',
      label: '产品类别类型',
      treeData: [],
      rules: [
        {
          required: true,
          message: '请选择产品类别类型',
        },
      ],
    },
    primaryParentCategoryId: {
      type: 'treeSelect',
      label: '主父产品类别',
      treeData: [],
    },
    description: {
      type: 'textArea',
      label: '描述',
    },
  },
};
