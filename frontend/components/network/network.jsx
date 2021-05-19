import React from 'react';

class Network extends React.Component {
  
}

const mapSTP = ({ entities: { users, connections } }) => {
  
  return {

  }
};

const mapDTP = dispatch => ({
  fetchConnections: () => dispatch(fetchConnections())
});

const NetworkContainer = connect(mapSTP, mapDTP)(Network);

export default NetworkContainer;