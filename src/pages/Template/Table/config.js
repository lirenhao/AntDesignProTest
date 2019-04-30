export default {
  productPriceType: {
    // TODO 检索字段
    header: '产品价格类型',
    genKey: record => record.productPriceTypeId,
    queryFileds: ['productPriceTypeId', 'productPriceTypeName', 'description'],
    columns: [
      {
        title: '产品价格类型名称',
        dataIndex: 'productPriceTypeName',
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
    ],
    mutateFileds: ['productPriceTypeName', 'description'],
    formInfo: {
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
};
