import React from 'react'
import { connect } from 'dva'
import {
  Modal,
  Card,
  Divider,
  Transfer,
} from 'antd'
import DescriptionList from '@/components/DescriptionList'

const { Description } = DescriptionList

@connect(({ productCategory }) => ({
  info: productCategory.info,
}))
class Rollup extends React.Component {

  state = {
    dataSource: [],
    targetKeys: [],
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dataSource: nextProps.categorys })
  }

  handleSubmit = () => {
    const { handleFormSubmit } = this.props;
    const { targetKeys } = this.state;
    handleFormSubmit({
      id: '',
      ids: targetKeys,
    })
  };

  renderItem = (item) => {
    const customLabel = (
      <span>{item.title}</span>
    );
    return {
      label: customLabel, // for displayed item
      value: item.key, // for title and filter matching
    };
  }

  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  }

  render() {
    const {
      info,
      visible,
      hideModal,
    } = this.props
    const {
      dataSource,
      targetKeys,
    } = this.state

    return (
      <Modal 
        width="60%"
        bodyStyle={{ padding: '32px 40px 48px' }}
        title='隶属选择'
        maskClosable={false}
        visible={visible}
        okText="提交"
        onOk={this.handleSubmit}
        onCancel={hideModal}
      >
        <Card bordered={false}>
          <DescriptionList size="large" title="产品类别">
            <Description term="产品类别名称">{info.categoryName}</Description>
            <Description term="描述">{info.description}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <Transfer
            style={{ marginBottom: 32 }}
            titles={['可选', '已选']}
            dataSource={dataSource}
            targetKeys={targetKeys}
            onChange={this.handleChange}
            render={this.renderItem}
          />
        </Card>
      </Modal>
    )
  }
}

export default Rollup;