import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Card, Tree, Menu, Dropdown, Input, Empty, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Create from '@/components/MyTree/Create';
import Update from '@/components/MyTree/Update';

class MyTree extends React.Component {
  static defaultProps = {
    tree: [],
  };

  static propsTypes = {
    header: PropTypes.string,
    tree: PropTypes.array,
    formInfo: PropTypes.object,
    getInfo: PropTypes.func,
    createSubmit: PropTypes.func,
    updateSubmit: PropTypes.func,
    removeSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      selectedKeys: [],
      isCreateShow: false,
      info: {},
      parentTypeId: '',
    };
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onChange = e => {
    const { tree } = this.props;
    const { value } = e.target;
    const expandedKeys = [];
    const loop = data => {
      data.forEach(item => {
        if (item.children && item.children.length) {
          if (item.children.filter(child => child.title.indexOf(value) > -1).length > 0)
            expandedKeys.push(item.value === '' ? '0-0' : item.value);
          loop(item.children);
        }
      });
    };
    loop(tree);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  handleCreateModal = (visible, parentTypeId = '') => {
    this.setState({ isCreateShow: visible, parentTypeId });
  };

  handleCreateForm = values => {
    const { createSubmit } = this.props;
    createSubmit(values, () => {
      this.handleCreateModal(false);
      message.success('创建成功');
    });
  };

  handleTreeSelect = (selectedKeys, e) => {
    const { getInfo } = this.props;
    const key = e.node.props.eventKey;
    this.setState({ selectedKeys, info: e.selected ? getInfo(key) : {} });
  };

  handleUpdateForm = record => {
    const { updateSubmit } = this.props;
    updateSubmit(record, () => {
      this.setState({ info: record });
      message.success('更新成功');
    });
  };

  handleRemove = key => {
    const { removeSubmit, getInfo } = this.props;
    const { selectedKeys } = this.state;
    removeSubmit(key, () => {
      if (selectedKeys.includes(key)) this.setState({ selectedKeys: [], info: getInfo(key) });
      message.success('删除成功');
    });
  };

  renderRightMenu(record) {
    if (record.children && record.children.length) {
      return (
        <Menu>
          <Menu.Item onClick={() => this.handleCreateModal(true, record.value)}>添加节点</Menu.Item>
        </Menu>
      );
    }
    return (
      <Menu>
        <Menu.Item onClick={() => this.handleCreateModal(true, record.value)}>添加节点</Menu.Item>
        <Menu.Item onClick={() => this.handleRemove(record.value)}>删除节点</Menu.Item>
      </Menu>
    );
  }

  renderTreeTitle(record) {
    const { searchValue } = this.state;
    const index = (record.title || '').indexOf(searchValue);
    const beforeStr = (record.title || '').substr(0, index);
    const afterStr = (record.title || '').substr(index + searchValue.length);
    const title =
      index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : (
        <span>{record.title}</span>
      );
    return (
      <Dropdown overlay={this.renderRightMenu(record)} trigger={['contextMenu']}>
        {title}
      </Dropdown>
    );
  }

  render() {
    const { header, tree, formInfo } = this.props;
    const {
      expandedKeys,
      autoExpandParent,
      selectedKeys,
      isCreateShow,
      info,
      parentTypeId,
    } = this.state;

    const loop = data =>
      data.map(item => {
        if (item.children && item.children.length) {
          return (
            <Tree.TreeNode key={item.value} title={this.renderTreeTitle(item)} info={item}>
              {loop(item.children)}
            </Tree.TreeNode>
          );
        }
        return <Tree.TreeNode key={item.value} title={this.renderTreeTitle(item)} info={item} />;
      });

    return (
      <PageHeaderWrapper title={header}>
        <Layout>
          <Layout.Sider theme="light" width="200">
            <Card bordered={false}>
              <Input.Search
                style={{ marginBottom: 8 }}
                placeholder="Search"
                onChange={this.onChange}
              />
              <Tree
                onExpand={this.onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                selectedKeys={selectedKeys}
                onSelect={this.handleTreeSelect}
              >
                {loop(tree)}
              </Tree>
            </Card>
          </Layout.Sider>
          <Layout.Content>
            <Card title={`${header}编辑`}>
              {Object.keys(info).length < 1 ? (
                <Empty description="点击节点" />
              ) : (
                <Update
                  formInfo={formInfo}
                  info={info}
                  tree={tree}
                  handleFormSubmit={this.handleUpdateForm}
                />
              )}
            </Card>
            <Create
              visible={isCreateShow}
              hideModal={() => this.handleCreateModal(false)}
              handleFormSubmit={this.handleCreateForm}
              formInfo={formInfo}
              info={{ parentTypeId }}
              tree={tree}
            />
          </Layout.Content>
        </Layout>
      </PageHeaderWrapper>
    );
  }
}

export default MyTree;
