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
      isCreateShow: false,
      isUpdateShow: false,
      info: {},
    };
  }

  handleAddModal = visible => {
    this.setState({ isCreateShow: visible });
  };

  handleAddForm = record => {
    const { value } = this.state;
    const { limit, setLimit } = this.props;
    this.setState({
      value: [...value, record],
    });
    const { onChange } = this.props;
    if (onChange) {
      onChange([...value, record]);
    }
    setLimit({
      featureTypeIds: [...limit.featureTypeIds, record.featureTypeId],
      featureIds: [...limit.featureIds, ...record.featureIds],
    });
    this.handleAddModal(false);
  };

  handleUpdateModal = visible => {
    this.setState({ isUpdateShow: visible });
  };

  handleUpdate = record => {
    this.setState({ info: record });
    this.handleUpdateModal(true);
  };

  handleUpdateForm = (record, info) => {
    const { value } = this.state;
    const { limit, setLimit } = this.props;
    const newValue = value.map(item => (info.featureTypeId === item.featureTypeId ? record : item));
    this.setState({
      value: newValue,
    });
    const { onChange } = this.props;
    if (onChange) {
      onChange(newValue);
    }
    setLimit({
      featureTypeIds: [
        ...limit.featureTypeIds.filter(id => id !== info.featureTypeId),
        record.featureTypeId,
      ],
      featureIds: [
        ...limit.featureIds.filter(id => (info.featureIds || []).indexOf(id) < 0),
        ...record.featureIds,
      ],
    });
    this.handleUpdateModal(false);
  };

  handleRemove = record => {
    const { value } = this.state;
    const { limit, setLimit } = this.props;
    this.setState({
      value: value.filter(item => record.featureTypeId !== item.featureTypeId),
    });
    setLimit({
      featureTypeIds: [...limit.featureTypeIds.filter(id => id !== record.featureTypeId)],
      featureIds: [...limit.featureIds.filter(id => record.featureIds.indexOf(id) < 0)],
    });
  };

  render() {
    const { productFeatureType, productFeature, title, label, limit } = this.props;
    const { value, isCreateShow, isUpdateShow, info } = this.state;

    return (
      <div>
        <Button onClick={() => this.handleAddModal(true)}>添加</Button>
        {value && value.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={value}
            renderItem={item => (
              <List.Item
                actions={[
                  <a onClick={() => this.handleUpdate(item)}>修改</a>,
                  <a onClick={() => this.handleRemove(item)}>删除</a>,
                ]}
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
          title={`添加${title}`}
          label={label}
          limit={limit}
          value={value || []}
          info={{}}
        />
        <Create
          visible={isUpdateShow}
          hideModal={() => this.handleUpdateModal(false)}
          handleFormSubmit={this.handleUpdateForm}
          title={`修改${title}`}
          label={label}
          limit={limit}
          value={value || []}
          info={info}
        />
      </div>
    );
  }
}

export default Feature;
