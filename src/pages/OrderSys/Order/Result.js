import React from 'react';
import { connect } from 'dva';
import { Spin, Card, Descriptions, Button } from 'antd';

@connect(({ order, loading }) => ({
  geo: order.dict.geo,
  productFeatureType: order.dict.productFeatureType,
  productFeature: order.dict.productFeature,
  loading: loading.models.order,
}))
class Result extends React.PureComponent {
  handleSubmit = () => {
    const { info, handleNext } = this.props;
    handleNext({ ...info });
  };

  render() {
    const { info, handlePrev, loading } = this.props;

    return (
      <Spin spinning={loading}>
        <div
          style={{
            marginTop: '16px',
            border: '1px dashed #e9e9e9',
            borderRadius: '6px',
            backgroundColor: '#fafafa',
            minHeight: '200px',
            textAlign: 'center',
          }}
        >
          <Card title="订单信息" bordered={false}>
            <Descriptions bordered>
              <Descriptions.Item label="客户分期">{info.instalmentTypeEnumId}</Descriptions.Item>
              <Descriptions.Item label="续费状态">{info.renewalFeeStatusId}</Descriptions.Item>
              <Descriptions.Item label="公司法人">{info.legalPartyGroupName}</Descriptions.Item>
              <Descriptions.Item label="公司名称">{info.corpName}</Descriptions.Item>
              <Descriptions.Item label="合同类型">{info.agreementTypeId}</Descriptions.Item>
              <Descriptions.Item label="合同编号">{info.agreementCode}</Descriptions.Item>
              <Descriptions.Item label="订单日期">{info.orderDate}</Descriptions.Item>
              <Descriptions.Item label="服务佣金">{info.serviceCommission}</Descriptions.Item>
              <Descriptions.Item label="服务佣金">{info.serviceCommission}</Descriptions.Item>
              <Descriptions.Item label="服务产品" span={3}>
                {info.products.map(item => (
                  <React.Fragment>
                    <Descriptions bordered>
                      <Descriptions.Item label={item.productName}>
                        {item.productPrice}
                      </Descriptions.Item>
                      <Descriptions.Item label="优惠价格">{item.discountPrice}</Descriptions.Item>
                      <Descriptions.Item label={item.geoName}>{item.geoPrice}</Descriptions.Item>
                      {item.features.map(feature => (
                        <Descriptions.Item label={feature.featureName}>
                          {feature.featurePrice}
                        </Descriptions.Item>
                      ))}
                    </Descriptions>
                    <br />
                  </React.Fragment>
                ))}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px',
          }}
        >
          <Button type="primary" onClick={this.handleSubmit}>
            提 交
          </Button>
          <Button onClick={handlePrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
        </div>
      </Spin>
    );
  }
}

export default Result;
