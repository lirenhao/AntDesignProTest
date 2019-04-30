import React from 'react';
import { connect } from 'dva';
import { objToTree } from '@/utils/utils';
import MyTree from '@/components/MyTree';
import config from './config';

@connect(({ [config.type]: state }) => ({
  list: state.list,
  typeList: state.typeList,
}))
class ProductCategory extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: `${config.type}/list`,
    });
  }

  getInfo = key => {
    const { list } = this.props;
    return list.filter(item => config.genKey(item) === key)[0] || {};
  };

  createSubmit = (record, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${config.type}/create`,
      payload: record,
      callback,
    });
  };

  updateSubmit = (record, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${config.type}/update`,
      payload: record,
      callback,
    });
  };

  removeSubmit = (key, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${config.type}/remove`,
      payload: key,
      callback,
    });
  };

  render() {
    const { list, typeList } = this.props;
    const tree = config.listToTree(list);
    const formInfo = {
      ...config.formInfo,
      productCategoryTypeId: {
        ...config.formInfo.productCategoryTypeId,
        treeData:
          objToTree(
            { productCategoryTypeId: '', productCategoryTypeName: '父级节点' },
            typeList,
            'productCategoryTypeId',
            'parentTypeId',
            'productCategoryTypeName'
          ).children || [],
      },
      primaryParentCategoryId: {
        ...config.formInfo.primaryParentCategoryId,
        treeData: tree,
      },
    };

    return (
      <MyTree
        header={config.header}
        tree={tree}
        formInfo={formInfo}
        getInfo={this.getInfo}
        createSubmit={this.createSubmit}
        updateSubmit={this.updateSubmit}
        removeSubmit={this.removeSubmit}
      />
    );
  }
}

export default ProductCategory;
