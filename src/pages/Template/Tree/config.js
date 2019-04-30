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
  productAssocType: {
    header: '产品关联类型',
    genKey: record => record.productAssocTypeId,
    listToTree: list => [
      objToTree(
        { productAssocTypeId: '', productAssocTypeName: '父级节点' },
        list,
        'productAssocTypeId',
        'parentTypeId',
        'productAssocTypeName'
      ),
    ],
    queryFileds: [
      'productAssocTypeId',
      'parentTypeId',
      'productAssocTypeName',
      'isTable',
      'description',
    ],
    mutateFileds: ['parentTypeId', 'productAssocTypeName', 'isTable', 'description'],
    formInfo: {
      parentTypeId: {
        type: 'treeSelect',
        label: '所属父级',
      },
      productAssocTypeName: {
        type: 'input',
        label: '产品关联类型名称',
        rules: [
          {
            required: true,
            message: '请输入产品关联类型名称',
          },
        ],
      },
      isTable: {
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
  productCategoryType: {
    header: '产品类别类型',
    genKey: record => record.productCategoryTypeId,
    listToTree: list => [
      objToTree(
        { productCategoryTypeId: '', productCategoryTypeName: '父级节点' },
        list,
        'productCategoryTypeId',
        'parentTypeId',
        'productCategoryTypeName'
      ),
    ],
    queryFileds: [
      'productCategoryTypeId',
      'parentTypeId',
      'productCategoryTypeName',
      'hasTable',
      'description',
    ],
    mutateFileds: ['parentTypeId', 'productCategoryTypeName', 'hasTable', 'description'],
    formInfo: {
      parentTypeId: {
        type: 'treeSelect',
        label: '所属父级',
      },
      productCategoryTypeName: {
        type: 'input',
        label: '产品类别类型名称',
        rules: [
          {
            required: true,
            message: '请输入产品类别类型名称',
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
  productFeatureType: {
    header: '产品特征类型',
    genKey: record => record.productFeatureTypeId,
    listToTree: list => [
      objToTree(
        { productFeatureTypeId: '', productFeatureTypeName: '父级节点' },
        list,
        'productFeatureTypeId',
        'parentTypeId',
        'productFeatureTypeName'
      ),
    ],
    queryFileds: [
      'productFeatureTypeId',
      'parentTypeId',
      'productFeatureTypeName',
      'hasTable',
      'description',
    ],
    mutateFileds: ['parentTypeId', 'productFeatureTypeName', 'hasTable', 'description'],
    formInfo: {
      parentTypeId: {
        type: 'treeSelect',
        label: '所属父级',
      },
      productFeatureTypeName: {
        type: 'input',
        label: '产品特征类型名称',
        rules: [
          {
            required: true,
            message: '请输入产品特征类型名称',
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
  productFeatureIactnType: {
    header: '产品特征互作用类型',
    genKey: record => record.productFeatureIactnTypeId,
    listToTree: list => [
      objToTree(
        { productFeatureIactnTypeId: '', productFeatureIactnTypeName: '父级节点' },
        list,
        'productFeatureIactnTypeId',
        'parentTypeId',
        'productFeatureIactnTypeName'
      ),
    ],
    queryFileds: [
      'productFeatureIactnTypeId',
      'parentTypeId',
      'productFeatureIactnTypeName',
      'hasTable',
      'description',
    ],
    mutateFileds: ['parentTypeId', 'productFeatureIactnTypeName', 'hasTable', 'description'],
    formInfo: {
      parentTypeId: {
        type: 'treeSelect',
        label: '所属父级',
      },
      productFeatureIactnTypeName: {
        type: 'input',
        label: '产品特征类型名称',
        rules: [
          {
            required: true,
            message: '请输入产品特征类型名称',
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
  productFeatureApplType: {
    header: '产品特征适用性类型',
    genKey: record => record.productFeatureApplTypeId,
    listToTree: list => [
      objToTree(
        { productFeatureApplTypeId: '', productFeatureApplTypeName: '父级节点' },
        list,
        'productFeatureApplTypeId',
        'parentTypeId',
        'productFeatureApplTypeName'
      ),
    ],
    queryFileds: [
      'productFeatureApplTypeId',
      'parentTypeId',
      'productFeatureApplTypeName',
      'hasTable',
      'description',
    ],
    mutateFileds: ['parentTypeId', 'productFeatureApplTypeName', 'hasTable', 'description'],
    formInfo: {
      parentTypeId: {
        type: 'treeSelect',
        label: '所属父级',
      },
      productFeatureApplTypeName: {
        type: 'input',
        label: '产品特征类型名称',
        rules: [
          {
            required: true,
            message: '请输入产品特征类型名称',
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
};
