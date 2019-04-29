import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table, Button, Popconfirm, Divider, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Create from '@/components/MyTable/Create';
import styles from '@/components/MyTable/table.less';

class MyTable extends React.Component {
  static defaultProps = {
    list: [],
    columns: [],
  };

  static propsTypes = {
    header: PropTypes.string,
    list: PropTypes.array,
    columns: PropTypes.array,
    formInfo: PropTypes.object,
    getInfo: PropTypes.func,
    createSubmit: PropTypes.func,
    updateSubmit: PropTypes.func,
    removeSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isCreateShow: false,
      isUpdateShow: false,
      info: {},
    };
  }

  handleCreateForm = values => {
    const { createSubmit } = this.props;
    createSubmit(values, () => {
      this.setState({ isCreateShow: false });
      message.success('创建成功');
    });
  };

  handleUpdate = key => {
    const { getInfo } = this.props;
    this.setState({ isUpdateShow: true, info: getInfo(key) });
  };

  handleUpdateForm = record => {
    const { updateSubmit } = this.props;
    updateSubmit(record, () => {
      this.setState({ isUpdateShow: false });
      message.success('更新成功');
    });
  };

  handleRemove = key => {
    const { removeSubmit } = this.props;
    removeSubmit(key, () => {
      message.success('删除成功');
    });
  };

  render() {
    const { header, list, columns, formInfo } = this.props;
    const { isCreateShow, isUpdateShow, info } = this.state;

    return (
      <PageHeaderWrapper title={header}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button
                icon="plus"
                type="primary"
                onClick={() => this.setState({ isCreateShow: true })}
              >
                新建
              </Button>
            </div>
            <Table
              dataSource={list}
              columns={[
                ...columns,
                {
                  title: '操作',
                  render: (_, record) => (
                    <React.Fragment>
                      <Popconfirm
                        title="是否要删除此行？"
                        onConfirm={() => this.handleRemove(record.key)}
                      >
                        <a>删除</a>
                      </Popconfirm>
                      <Divider type="vertical" />
                      <a onClick={() => this.handleUpdate(record.key)}>修改</a>
                    </React.Fragment>
                  ),
                },
              ]}
            />
          </div>
        </Card>
        <Create
          title="新建"
          formInfo={formInfo}
          visible={isCreateShow}
          hideModal={() => this.setState({ isCreateShow: false })}
          handleFormSubmit={this.handleCreateForm}
          info={{}}
        />
        <Create
          title="编辑"
          formInfo={formInfo}
          visible={isUpdateShow}
          hideModal={() => this.setState({ isUpdateShow: false })}
          handleFormSubmit={this.handleUpdateForm}
          info={info}
        />
      </PageHeaderWrapper>
    );
  }
}

export default MyTable;
