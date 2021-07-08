import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createConnection, deleteConnection, receiveConnection, updateConnection } from '../../actions/connection';
import { fetchConnection } from '../../util/connection_api';
import { openModal } from '../../actions/modal';

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      drop: false,
      requested: false,
      accepted: false,
      connectionId: null,
      connection: null
    };

    this.clicked = this.clicked.bind(this);
    this.leave = this.leave.bind(this);
  }

  componentDidMount() {
    const { currentUser, user, fetchConnectionAPI, receiveConnection, dispatch } = this.props;
    
    fetchConnectionAPI(currentUser, user.id).then(
      payload => {
        if (payload.connection) {
          dispatch(receiveConnection(payload));
          this.setState({ 
            connection: Object.values(payload.connection)[0], 
            connectionId: Object.keys(payload.connection)[0], 
            accepted: Object.values(payload.connection)[0].accepted,
            requested: true 
          });
        }
      }
    );
  }

  clicked() {
    this.setState({ drop: true });
  }

  leave() {
    this.setState({ drop: false });
  }

  render() {
    const { 
      user, currentUser, match, openModal, lastEdu, lastExp, createConnection, 
      deleteConnection, updateConnection
    } = this.props; 
    const { 
      drop, accepted, requested, connectionId, connection
    } = this.state;

    if (!user) return null;
    let editIntroBtn; let editSectionBtn; let connectBtn; let avatarBtn; let bgBtn;
    
    if (currentUser == match.params.id) {
      editIntroBtn = (
        <button onClick={() => openModal('editIntro')} className='edit-intro-btn'>
          <i className="fas fa-pencil-alt"></i>
        </button>
      );
      
      editSectionBtn = (
        <>
          <button onFocus={this.clicked} onBlur={this.leave} className='pf-section-btn'>Edit section
            <ul className={'pf-section-dropdown ' + (drop ? 'reveal' : 'hide')}>
              <li onClick={() => { openModal('editIntro'); this.leave(); }}>Intro</li>
              <li onClick={() => { openModal('createExp'); this.leave(); }}>Experiences</li>
              <li onClick={() => { openModal('createEdu'); this.leave(); }}>Education</li>
            </ul>
          </button>
        </>
      );

      avatarBtn = (
        <button onClick={() => openModal('uploadAvatar')} className='upload-avatar-btn'>
          <i className="fas fa-camera-retro"></i>
        </button>
      );

      bgBtn = (
        <button onClick={() => openModal('uploadBackground')} className='upload-bg-btn'>
          <i className="fas fa-camera-retro"></i>
        </button>
      );
    } else {
      if (requested && accepted) {
        connectBtn = ( 
          <button className='connect-btn' onClick={() => {
            deleteConnection(connectionId);
            this.setState({ 
              requested: false,
              accepted: false 
            });
          }}>Unlink</button>
        ) 
      }
      if (!requested && !accepted) {
        connectBtn = ( 
          <button className='connect-btn' onClick={() => {
            createConnection({ connector_id: currentUser, connected_id: user.id });
            this.setState({ requested: true });
          }}>Link</button> 
        )
      }
      if (requested && !accepted) {
        if (connection.connectorId == currentUser) {
          connectBtn = ( 
            <button className='connect-btn' onClick={() => {
              deleteConnection(connectionId);
              this.setState({ requested: false });
            }}>Cancel</button> 
          )
        } else {
          connectBtn = ( 
            <button className='connect-btn' onClick={() => {
              updateConnection(connection);
              this.setState({ accepted: true });
            }}>Accept</button> 
          )
        }
      }
    }

    const userSummary = user.summary ? (
      <div className='whitebox summary profile'>
        <h1>About</h1>
        <p>{user.summary}</p>
      </div>
    ) : null;
    
    return (
      <>
        <div className='user-pf-ctnr'>
          <div className='user-bg-img'>
            <img src={user.background || window.defaultBg} alt="Background Pic"/>
            {bgBtn}
          </div>
          <div className='user-details'>
            <div className='pf-user-info'>
              <div className='pf-avatar-ctnr'>
                <div className='avatar pf large'>
                  <img src={user.avatarUrl || window.defaultUser} alt="Profile Pic" className='pfp large'/>
                </div>
                {avatarBtn}
              </div>
              <div>
                <h1>{`${user.fname} ${user.lname}`}</h1>
              </div>
              <div>
                <h2>{user.headline}</h2>
              </div>
              <div>
                <h3>{user.location}</h3>
              </div>
              <div>
                <span>{user.connections} connection{user.connections > 1 || user.connections == 0 ? 's' : ''}</span>
              </div>
              <div className='user-details-btns'>
                {connectBtn}
                {editSectionBtn}
              </div>
            </div>
            <div className='pf-user-hist'>
              {editIntroBtn}
              <p>{lastExp ? lastExp.company : null}</p>
              <p>{lastEdu ? lastEdu.school : null}</p>
            </div>
          </div>
        </div>
        {userSummary}
      </>
    );
  }
}

const mapSTP = ({ entities: { users }, session: { currentUser } }, ownProps) => {
  const user = users[ownProps.match.params.id]
  
  return {
    currentUser,
    user
  }
};

const mapDTP = dispatch => ({
  openModal: (modal, id) => dispatch(openModal(modal, id)),
  createConnection: connection => dispatch(createConnection(connection)),
  updateConnection: connection => dispatch(updateConnection(connection)),
  deleteConnection: connectionId => dispatch(deleteConnection(connectionId)),
  fetchConnectionAPI: (connectorId, connectedId) => fetchConnection(connectorId, connectedId),
  receiveConnection: connection => receiveConnection(connection),
  dispatch
});

const UserDetailContainer = withRouter(connect(mapSTP, mapDTP)(UserDetail));

export default UserDetailContainer;