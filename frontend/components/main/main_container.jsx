import React from 'react';
import { connect } from 'react-redux';
import { ProtectedRoute } from '../../util/route_util';
import FeedContainer from '../feed/feed';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ProtectedRoute exact path='/feed' component={FeedContainer}/>
    )
  }
}

const MainContainer = connect()(Main);

export default MainContainer;