import React from 'react';
import { ProtectedRoute } from '../../util/route_util';
import FeedContainer from '../feed/feed';
import ProfileContainer from '../profile/profile'

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <ProtectedRoute exact path='/feed' component={FeedContainer}/>
        <ProtectedRoute exact path='/users/:id' component={ProfileContainer}/>
      </>
    )
  }
}


export default Main;