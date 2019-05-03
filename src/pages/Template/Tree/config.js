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
    queryFileds: {
      productTypeId: undefined,
      parentTypeId: undefined,
      productTypeName: undefined,
      isPhysical: undefined,
      isDigital: undefined,
      hasTable: undefined,
      description: undefined,
    },
    mutateFileds: {
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
    queryFileds: {
      productAssocTypeId: undefined,
      parentTypeId: undefined,
      productAssocTypeName: undefined,
      isTable: undefined,
      description: undefined,
    },
    mutateFileds: {
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
    queryFileds: {
      productCategoryTypeId: undefined,
      parentTypeId: undefined,
      productCategoryTypeName: undefined,
      hasTable: undefined,
      description: undefined,
    },
    mutateFileds: {
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
    queryFileds: {
      productFeatureTypeId: undefined,
      parentTypeId: undefined,
      productFeatureTypeName: undefined,
      hasTable: undefined,
      description: undefined,
    },
    mutateFileds: {
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
    queryFileds: {
      productFeatureIactnTypeId: undefined,
      parentTypeId: undefined,
      productFeatureIactnTypeName: undefined,
      hasTable: undefined,
      description: undefined,
    },
    mutateFileds: {
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
    queryFileds: {
      productFeatureApplTypeId: undefined,
      parentTypeId: undefined,
      productFeatureApplTypeName: undefined,
      hasTable: undefined,
      description: undefined,
    },
    mutateFileds: {
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
  productCategory: {
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
    queryFileds: {
      productCategoryId: undefined,
      categoryName: undefined,
      productCategoryTypeId: undefined,
      primaryParentCategoryId: undefined,
      description: undefined,
    },
    attachFileds: {
      productCategoryType: {
        queryGql: `
        productCategoryType: productCategoryTypeAll {
          productCategoryTypeId
          parentTypeId
          productCategoryTypeName
        }`,
        filed: 'productCategoryTypeId',
        getData: list =>
          objToTree(
            { productCategoryTypeId: '', productCategoryTypeName: '父级节点' },
            list.productCategoryType || [],
            'productCategoryTypeId',
            'parentTypeId',
            'productCategoryTypeName'
          ).children || [],
      },
    },
    parentTypeId: 'primaryParentCategoryId',
    mutateFileds: {
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
  },
};
