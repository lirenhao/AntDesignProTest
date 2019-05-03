import React from 'react';
import { connect } from 'dva';
import MyTree from '@/components/MyTree';
import config from './config';

@connect(({ template }) => ({
  list: template.list,
}))
class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = config[props.route.name];
  }

  componentDidMount() {
    const { dispatch, route } = this.props;
    dispatch({
      type: 'template/list',
      payload: route.name,
    });
  }

  getInfo = key => {
    const { list, route } = this.props;
    const { genKey } = this.state;
    const data = list[route.name] || [];
    return data.filter(item => genKey(item) === key)[0] || {};
  };

  createSubmit = (record, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/create',
      payload: record,
      callback,
    });
  };

  updateSubmit = (record, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/update',
      payload: record,
      callback,
    });
  };

  removeSubmit = (key, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/remove',
      payload: key,
      callback,
    });
  };

  render() {
    const { list, route } = this.props;
    const { listToTree, header, parentTypeId, attachFileds, mutateFileds } = this.state;
    const tree = listToTree(list[route.name] || []);
    if (parentTypeId) {
      mutateFileds[parentTypeId].treeData = tree;
    } else {
      mutateFileds.parentTypeId.treeData = tree;
    }
    if (attachFileds) {
      Object.keys(attachFileds).forEach(key => {
        const { filed, getData } = attachFileds[key];
        mutateFileds[filed].treeData = getData(list);
      });
    }
    return (
      <MyTree
        header={header}
        tree={tree}
        formInfo={mutateFileds}
        getInfo={this.getInfo}
        createSubmit={this.createSubmit}
        updateSubmit={this.updateSubmit}
        removeSubmit={this.removeSubmit}
      />
    );
  }
}

export default Tree;
