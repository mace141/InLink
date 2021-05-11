import React from 'react';
import { connect } from 'react-redux';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <p>Main</p>
  }
}

const MainContainer = connect()(Main);

export default MainContainer;