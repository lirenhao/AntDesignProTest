import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { List, Button } from 'antd';
import Create from './Create';

@connect(({ product }) => ({
  productFeatureType: product.dict.productFeatureType,
  productFeature: product.dict.productFeature,
}))
class Feature extends React.Component {
  propTypes = {
    value: PropTypes.array.isRequired,
  };

  defaultProps = {
    value: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || [],
      isCreateShow: false,
    };
  }

  handleAddModal = visible => {
    this.setState({ isCreateShow: visible });
  };

  handleAddForm = record => {
    // TODO set value
    console.log(record);
  };

  render() {
    const { value, isCreateShow } = this.state;

    return (
      <div>
        {value.map(item => (
          <div>{item.name}</div>
        ))}
        <Button onClick={() => this.handleAddModal(true)}>添加</Button>
        <List
          itemLayout="horizontal"
          dataSource={[]}
          renderItem={item => (
            <List.Item actions={[<Button onClick={() => this.handleAddModal(true)}>删除</Button>]}>
              <List.Item.Meta title={item.featureTypeId} description={item.featureIds} />
              <div>{item.isExclusive}</div>
            </List.Item>
          )}
        />
        <Create
          visible={isCreateShow}
          hideModal={() => this.handleAddModal(false)}
          handleFormSubmit={this.handleAddForm}
          info={{}}
        />
      </div>
    );
  }
}

export default Feature;
