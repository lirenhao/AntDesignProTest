import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table, Input, Button, Icon, Popconfirm, Divider, message } from 'antd';
import Highlighter from 'react-highlight-words';
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
      searchText: '',
      isCreateShow: false,
      isUpdateShow: false,
      info: {},
    };
  }

  getColumnSearchProps = ({ dataIndex, title }) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`${title}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        // eslint-disable-next-line react/destructuring-assignment
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text || ''}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

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
                ...columns.map(item =>
                  item.isSearch ? { ...item, ...this.getColumnSearchProps(item) } : item
                ),
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
