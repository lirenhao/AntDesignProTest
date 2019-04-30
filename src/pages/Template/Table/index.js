import React from 'react';
import { connect } from 'dva';
import MyTable from '@/components/MyTable';
import config from './config';

@connect(({ tempTable }) => ({
  list: tempTable.list,
}))
class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = config[props.route.name];
  }

  componentDidMount() {
    const { dispatch, route } = this.props;
    dispatch({
      type: `tempTable/list`,
      payload: route.name,
    });
  }

  getInfo = key => {
    const { list } = this.props;
    const { genKey } = this.state;
    return list.filter(item => genKey(item) === key)[0] || {};
  };

  createSubmit = (record, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: `tempTable/create`,
      payload: record,
      callback,
    });
  };

  updateSubmit = (record, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: `tempTable/update`,
      payload: record,
      callback,
    });
  };

  removeSubmit = (key, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: `tempTable/remove`,
      payload: key,
      callback,
    });
  };

  render() {
    const { list } = this.props;
    const { genKey, header, columns, formInfo } = this.state;
    const dataSource = list.map(item => ({ ...item, key: genKey(item) }));

    return (
      <MyTable
        header={header}
        list={dataSource}
        columns={columns}
        formInfo={formInfo}
        getInfo={this.getInfo}
        createSubmit={this.createSubmit}
        updateSubmit={this.updateSubmit}
        removeSubmit={this.removeSubmit}
      />
    );
  }
}

export default Table;
