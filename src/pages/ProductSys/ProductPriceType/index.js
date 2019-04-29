import React from 'react';
import { connect } from 'dva';
import MyTable from '@/components/MyTable';

const type = 'productPriceType';
const id = 'productPriceTypeId';
const header = '产品价格类型';
const genKey = record => record[id];

@connect(({ [type]: state }) => ({
  list: state.list,
}))
class Type extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: `${type}/list`,
    });
  }

  getInfo = key => {
    const { list } = this.props;
    return list.filter(item => genKey(item) === key)[0] || {};
  };

  createSubmit = (record, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${type}/create`,
      payload: record,
      callback,
    });
  };

  updateSubmit = (record, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${type}/update`,
      payload: record,
      callback,
    });
  };

  removeSubmit = (key, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${type}/remove`,
      payload: key,
      callback,
    });
  };

  render() {
    const { list } = this.props;
    const dataSource = list.map(item => ({ ...item, key: genKey(item) }));
    const columns = [
      {
        title: `${header}名称`,
        dataIndex: `${type}Name`,
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
    ];

    const formInfo = {
      [`${type}Name`]: {
        type: 'input',
        label: `${header}名称`,
        rules: [
          {
            required: true,
            message: `请输入${header}`,
          },
        ],
      },
      description: {
        type: 'textArea',
        label: '描述',
      },
    };

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

export default Type;
