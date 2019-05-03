import { objToTree } from '@/utils/utils';

export default {
  productPriceType: {
    header: '产品价格类型',
    genKey: record => record.productPriceTypeId,
    queryFileds: {
      productPriceTypeId: undefined,
      productPriceTypeName: {
        title: '产品价格类型名称',
        isSearch: true,
      },
      description: '描述',
    },
    mutateFileds: {
      productPriceTypeName: {
        type: 'input',
        label: '产品价格类型名称',
        rules: [
          {
            required: true,
            message: `请输入产品价格类型名称`,
          },
        ],
      },
      description: {
        type: 'textArea',
        label: '描述',
      },
    },
  },
  productPricePurpose: {
    header: '产品价格用途',
    genKey: record => record.productPricePurposeId,
    queryFileds: {
      productPricePurposeId: undefined,
      productPricePurposeName: {
        title: '产品价格用途名称',
        isSearch: true,
      },
      description: '描述',
    },
    mutateFileds: {
      productPricePurposeName: {
        type: 'input',
        label: '产品价格用途名称',
        rules: [
          {
            required: true,
            message: `请输入产品价格用途名称`,
          },
        ],
      },
      description: {
        type: 'textArea',
        label: '描述',
      },
    },
  },
  product: {
    header: '产品信息',
    genKey: record => record.productId,
    searchFileds: {},
    queryFileds: {
      productId: undefined,
      productName: '产品名称',
      internalName: '内部名称',
      description: '简要描述',
      productTypeId: undefined,
      productType: {
        title: '产品类型',
        dataIndex: 'productType.productTypeName',
        queryGql: 'productType { productTypeName }',
      },
      introductionDate: '引入日期',
      releaseDate: '发布日期',
      supportDiscontinuationDate: '支持结束日期',
      salesDiscontinuationDate: '销售终止日期',
      salesDiscWhenNotAvail: '缺货时销售有折扣否',
      comments: '备注',
    },
    attachFileds: {
      productType: {
        queryGql: `
        productType: productTypeAll {
          productTypeId
          parentTypeId
          productTypeName
        }`,
        filed: 'productTypeId',
        getData: list =>
          objToTree(
            { productTypeId: '', productTypeName: '父级节点' },
            list.productType || [],
            'productTypeId',
            'parentTypeId',
            'productTypeName'
          ).children || [],
      },
    },
    mutateFileds: {
      productName: {
        type: 'input',
        label: '产品名称',
        rules: [
          {
            required: true,
            message: '请输入产品名称',
          },
        ],
      },
      internalName: {
        type: 'input',
        label: '内部名称',
        rules: [
          {
            required: true,
            message: '请输入内部名称',
          },
        ],
      },
      productTypeId: {
        type: 'treeSelect',
        label: '产品类型',
        treeData: [],
        rules: [
          {
            required: true,
            message: '请选择产品类型',
          },
        ],
      },
      description: {
        type: 'textArea',
        label: '简要描述',
      },
      introductionDate: {
        type: 'date',
        label: '引入日期',
        rules: [
          {
            required: true,
            message: '请选择引入日期',
          },
        ],
      },
      releaseDate: {
        type: 'date',
        label: '发布日期',
        rules: [
          {
            required: true,
            message: '请选择发布日期',
          },
        ],
      },
      supportDiscontinuationDate: {
        type: 'date',
        label: '支持结束日期',
        rules: [
          {
            required: true,
            message: '请选择支持结束日期',
          },
        ],
      },
      salesDiscontinuationDate: {
        type: 'date',
        label: '销售终止日期',
        rules: [
          {
            required: true,
            message: '请选择销售终止日期',
          },
        ],
      },
      salesDiscWhenNotAvail: {
        type: 'switch',
        label: '缺货时销售是否有折扣',
        rules: [
          {
            required: true,
            message: '请选择缺货时销售是否有折扣',
          },
        ],
      },
      comments: {
        type: 'textArea',
        label: '备注',
      },
    },
  },
  productFeature: {
    header: '产品特征',
    genKey: record => record.productFeatureId,
    searchFileds: {},
    queryFileds: {
      productFeatureId: undefined,
      productFeatureTypeId: undefined,
      productFeatureType: {
        title: '产品特征类型',
        dataIndex: 'productFeatureType.productFeatureTypeName',
        queryGql: 'productFeatureType { productFeatureTypeName }',
      },
      productFeatureCategoryId: undefined,
      uomId: undefined,
      uom: {
        title: '计量标识',
        dataIndex: 'uom.uomName',
        queryGql: 'uom { uomName }',
      },
      numberSpecified: '指定编号',
      defaultAmount: '默认金额',
      defaultSequenceNum: '默认序列号',
      abbrev: '缩写',
      idCode: 'ID代码',
      description: '描述',
    },
    attachFileds: {
      productFeatureType: {
        queryGql: `
        productFeatureType: productFeatureTypeAll {
          productFeatureTypeId
          parentTypeId
          productFeatureTypeName
        }`,
        filed: 'productFeatureTypeId',
        getData: list =>
          objToTree(
            { productFeatureTypeId: '', productFeatureTypeName: '父级节点' },
            list.productFeatureType || [],
            'productFeatureTypeId',
            'parentTypeId',
            'productFeatureTypeName'
          ).children || [],
      },
      uom: {
        queryGql: `
        uom: uomAll {
          uomId
          uomName
        }`,
        filed: 'uomId',
        getData: list => (list.uom || []).map(item => ({ value: item.uomId, title: item.uomName })),
      },
    },
    mutateFileds: {
      productFeatureTypeId: {
        type: 'treeSelect',
        label: '产品特征类型',
        rules: [
          {
            required: true,
            message: '请选择产品特征类型',
          },
        ],
      },
      productFeatureCategoryId: {
        type: 'input',
        label: '产品特征类别标识',
      },
      description: {
        type: 'textArea',
        label: '描述',
      },
      uomId: {
        type: 'select',
        label: '计量标识',
        rules: [
          {
            required: true,
            message: '请选择计量标识',
          },
        ],
      },
      numberSpecified: {
        type: 'number',
        label: '指定编号',
        rules: [
          {
            type: 'number',
            message: '必须是数字',
          },
        ],
      },
      defaultAmount: {
        type: 'number',
        label: '默认金额',
        rules: [
          {
            type: 'number',
            message: '必须是数字',
          },
        ],
      },
      defaultSequenceNum: {
        type: 'number',
        label: '默认序列号',
        rules: [
          {
            type: 'number',
            message: '必须是数字',
          },
        ],
      },
      abbrev: {
        type: 'input',
        label: '缩写',
      },
      idCode: {
        type: 'input',
        label: 'ID代码',
      },
    },
  },
};
