import React from 'react'
import {
  Modal,
  Tree,
} from 'antd'

class Update extends React.Component {

  state = {
    gData: []
  }

  componentWillReceiveProps(props) {
    const loop = data => data.map((item) => {
      if(item.children && item.children.length) {
        return ({key: item.productTypeId, title: item.productTypeName, children: loop(item.children)})
      } 
      return ({key: item.productTypeId, title: item.productTypeName})
    })
    
    this.setState({ gData: loop(props.dataSource) })
  }

  handleSubmit = e => {
    const { handleFormSubmit, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        handleFormSubmit(values);
      }
    })
  }

  onTestDrop = (info) => {
    console.log(info.dropToGap, info);
    if(info.dropToGap)
      return;
    // 目标节点
    const dropKey = info.node.props.eventKey
    const drop = {
      key: info.node.props.eventKey,
      title: info.node.props.title,
      children: info.node.props.children || [],
    }
    // 拖动的节点
    const dragKey = info.dragNode.props.eventKey
    const drag = {
      key: info.dragNode.props.eventKey,
      title: info.dragNode.props.title,
      children: info.dragNode.props.children,
    }
    drop.children.push(drag)

    const { gData: newData } = this.state;

    const loopUpdate = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          callback(item, index, arr);
        }
        if (item.children) {
          loopUpdate(item.children, key, callback);
        }
      });
    };
    loopUpdate(newData, dropKey, (item, index, arr) => {
      arr.splice(index, 1, drop)
    })
    loopUpdate(newData, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
    })
    this.setState({
      gData: newData,
    });
  }

  onDrop = (info) => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      // eslint-disable-next-line consistent-return
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };

    const { gData: data } = this.state
    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        // eslint-disable-next-line no-param-reassign
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 // Has children
      && info.node.props.expanded // Is expanded
      && dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        // eslint-disable-next-line no-param-reassign
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({
      gData: data,
    });
  }

  render() {
    const {
      visible,
      hideModal,
    } = this.props;
    const { gData } = this.state;

    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return <Tree.TreeNode key={item.key} title={item.title}>{loop(item.children)}</Tree.TreeNode>;
      }
      return <Tree.TreeNode key={item.key} title={item.title} />;
    });

    return (
      <Modal
        bodyStyle={{ padding: '32px 40px 48px' }}
        title='排序'
        maskClosable={false}
        visible={visible}
        okText="提交"
        onOk={this.handleSubmit}
        onCancel={hideModal}
      >
        <Tree 
          draggable
          blockNode
          onDrop={this.onDrop}
        >
          {loop(gData)}
        </Tree>
      </Modal>
    )
  }
}

export default Update;