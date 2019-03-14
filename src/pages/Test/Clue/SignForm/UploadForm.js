import React from 'react';
import { 
  Row, Col, Upload, Icon, Button, Input
} from 'antd';

class UploadForm extends React.Component {
  state = {
    images: [],
  };

  handleImage = (el) => {
    const { images } = this.state;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const img = {
        name: '身份证',
        remark: '王小萌身份证件照',
        type: el.file.type,
        size: el.file.size,
        url: reader.result
      }
      this.setState({ images: [...images, img] })
    });
    reader.readAsDataURL(el.file);
  }

  handleDelImg(index) {
    const { images } = this.state;
    this.setState({ images: images.filter((img, i) => index !== i)})
  }

  render() {
    const { images } = this.state;
    return (
      <div>
        <Row>
          <Col span={6} style={{textAlign: 'right'}}>
            上传要求:
          </Col>
          <Col span={16} push={1}>
            <div>1、文件大小不得超过2M</div>
            <div>2、文件格式不限，可以为单独任意格式文件，也可以是压缩包</div>
            <div>3、可以单选上传，也可以从文件夹中多选上传</div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={6} style={{textAlign: 'right'}}>
            <Upload customRequest={this.handleImage} showUploadList={false}>
              <Button>
                <Icon type="upload" />上传附件
              </Button>
            </Upload>
          </Col>
        </Row>
        <br />
        {images.map((img, i) => (
          <Row key={img.name}>
            <Col span={6} style={{textAlign: 'right'}}>
              附件:
            </Col>
            <Col span={6} style={{textAlign: 'center'}}>
              <img src={img.url} width="80" alt={img.name} />
            </Col>
            <Col span={12}>
              <Row>
                <Col span={4}>
                  名称:
                </Col>
                <Col span={8}>
                  {img.name}
                </Col>
              </Row>
              <Row>
                <Col span={4}>
                  说明:
                </Col>
                <Col span={8}>
                  {img.remark}
                </Col>
              </Row>
              <Row>
                <Col span={2}>
                  格式:
                </Col>
                <Col span={4}>
                  {img.type}
                </Col>
                <Col span={2}>
                  大小:
                </Col>
                <Col span={4}>
                  {img.size/1000}KB
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Button onClick={() => this.handleDelImg(i)}>删除</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
        <br />
        <Row>
          <Col span={6} style={{textAlign: 'right'}}>
            材料上传备注:
          </Col>
          <Col span={16} push={1}>
            <Input.TextArea rows={4} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default UploadForm;