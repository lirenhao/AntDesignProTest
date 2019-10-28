import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { List, Button } from 'antd';
import Create from './Create';

function findText(id, arr, fieldId, fieldName) {
  const data = arr.filter(item => item[fieldId] === id);
  return data && data[0] ? data[0][fieldName] : '';
}

@connect(({ product }) => ({
  productFeatureType: product.dict.productFeatureType,
  productFeature: product.dict.productFeature,
}))
class Feature extends React.Component {
  static propTypes = {
    value: PropTypes.array,
  };

  static defaultProps = {
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
    const { value } = this.state;
    this.setState({
      value: [...value, record],
    });
    const { onChange } = this.props;
    if (onChange) {
      onChange([...value, record]);
    }
    this.handleAddModal(false);
  };

  render() {
    const { productFeatureType, productFeature } = this.props;
    const { value, isCreateShow } = this.state;

    return (
      <div>
        <Button onClick={() => this.handleAddModal(true)}>添加</Button>
        {value && value.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={value}
            renderItem={item => (
              <List.Item
                actions={[<Button onClick={() => this.handleAddModal(true)}>删除</Button>]}
              >
                <List.Item.Meta
                  title={findText(
                    item.featureTypeId,
                    productFeatureType,
                    'productFeatureTypeId',
                    'productFeatureTypeName'
                  )}
                  description={item.featureIds
                    .map(id =>
                      findText(id, productFeature, 'productFeatureId', 'productFeatureName')
                    )
                    .join('  ')}
                />
                <div>{item.isExclusive}</div>
              </List.Item>
            )}
          />
        ) : (
          <div />
        )}
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
