import React, { Component } from 'react';
import { connect } from 'dva'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ clue }) => ({
  title: clue.title,
}))
class Clue extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <PageHeaderWrapper title={title}>
        {children}
      </PageHeaderWrapper>
    )
  }
}

export default Clue;