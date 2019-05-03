import React from 'react';
import { connect } from 'dva';
import MyTable from '@/components/MyTable';
import config from './config';

@connect(({ template }) => ({
  list: template.list,
}))
class Table extends React.Component {
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
    const { genKey, header, queryFileds, attachFileds, mutateFileds } = this.state;
    const dataSource = (list[route.name] || []).map(item => ({ ...item, key: genKey(item) }));
    const columns = Object.keys(queryFileds)
      .filter(key => queryFileds[key])
      .map(key => {
        if (typeof queryFileds[key] === 'object') {
          return {
            ...queryFileds[key],
            title: queryFileds[key].title,
            dataIndex: queryFileds[key].dataIndex || key,
          };
        }
        return {
          title: queryFileds[key],
          dataIndex: key,
        };
      });
    if (attachFileds) {
      Object.keys(attachFileds).forEach(key => {
        const { filed, getData } = attachFileds[key];
        mutateFileds[filed].treeData = getData(list);
      });
    }
    return (
      <MyTable
        header={header}
        list={dataSource}
        columns={columns}
        formInfo={mutateFileds}
        getInfo={this.getInfo}
        createSubmit={this.createSubmit}
        updateSubmit={this.updateSubmit}
        removeSubmit={this.removeSubmit}
      />
    );
  }
}

export default Table;
