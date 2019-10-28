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
    limit: PropTypes.object.isRequired,
  };

  static defaultProps = {
    value: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || [],
      limit: props.limit || { featureTypeIds: [], featureIds: [] },
      isCreateShow: false,
    };
  }

  handleAddModal = visible => {
    this.setState({ isCreateShow: visible });
  };

  handleAddForm = record => {
    const { value, limit } = this.state;
    this.setState({
      value: [...value, record],
      limit: {
        featureTypeIds: [...limit.featureTypeIds, record.featureTypeId],
        featureIds: [...limit.featureIds, ...record.featureIds],
      },
    });
    const { onChange } = this.props;
    if (onChange) {
      onChange([...value, record]);
    }
    this.handleAddModal(false);
  };

  handleRemove = record => {
    const { value, limit } = this.state;
    this.setState({
      value: value.filter(item => record.featureTypeId !== item.featureTypeId),
      limit: {
        featureTypeIds: [...limit.featureTypeIds.filter(id => id !== record.featureTypeId)],
        featureIds: [...limit.featureIds.filter(id => record.featureIds.indexOf(id) < 0)],
      },
    });
  };

  render() {
    const { productFeatureType, productFeature } = this.props;
    const { value, limit, isCreateShow } = this.state;

    return (
      <div>
        <Button onClick={() => this.handleAddModal(true)}>添加</Button>
        {value && value.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={value}
            renderItem={item => (
              <List.Item actions={[<a onClick={() => this.handleRemove(item)}>删除</a>]}>
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
                <div>{item.isExclusive === '0' ? '单选' : '多选'}</div>
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
          limit={limit}
          info={{}}
        />
      </div>
    );
  }
}

export default Feature;
