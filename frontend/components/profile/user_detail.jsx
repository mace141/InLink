import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { createConnection } from '../../actions/connection';
import { openModal } from '../../actions/modal';

class UserDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = { drop: false };

    this.clicked = this.clicked.bind(this);
    this.leave = this.leave.bind(this);
  }

  clicked() {
    this.setState({ drop: true });
  }

  leave() {
    this.setState({ drop: false });
  }

  render() {
    const { 
      user, currentUser, match, openModal, lastEdu, lastExp, createConnection 
    } = this.props; 
    if (!user) return null;
    let editIntroBtn; let editSectionBtn; let connectBtn;
    
    if (currentUser == match.params.id) {
      editIntroBtn = (
        <button onClick={() => openModal('editIntro')} className='edit-intro-btn'>
          <i className="fas fa-pencil-alt"></i>
        </button>
      );
      
      editSectionBtn = (
        <>
          <button onFocus={this.clicked} onBlur={this.leave} className='pf-section-btn'>Edit section
            <ul className={'pf-section-dropdown ' + (this.state.drop ? 'reveal' : 'hide')}>
              <li onClick={() => openModal('editIntro')}>Intro</li>
              <li onClick={() => openModal('createExp')}>Experiences</li>
              <li onClick={() => openModal('createEdu')}>Education</li>
            </ul>
          </button>
        </>
      );
    } else {
      connectBtn = <button className='connect-btn' onClick={() => createConnection({
        connector_id: currentUser, connected_id: user.id
      })}>Connect</button>
    }

    const userSummary = user.summary ? (
      <div className='whitebox summary profile'>
        <h1>Summary</h1>
        <p>{user.summary}</p>
      </div>
    ) : null;

    return (
      <>
        <div className='user-pf-ctnr'>
          <div className='user-bg-img'>
            <img src={user.background || window.defaultBg} alt="Background Pic"/>
            <button onClick={() => openModal('uploadBackground')} className='upload-bg-btn'>
              <i className="fas fa-camera-retro"></i>
            </button>
          </div>
          <div className='user-details'>
            <div className='pf-user-info'>
              <div className='pf-avatar-ctnr'>
                <div className='avatar pf large'>
                  <img src={user.avatarUrl || window.defaultUser} alt="Profile Pic" className='pfp large'/>
                </div>
                <button onClick={() => openModal('uploadAvatar')} className='upload-avatar-btn'>
                  <i className="fas fa-camera-retro"></i>
                </button>
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
                <Link to='/mynetwork'>
                  <span>{user.connections} connections</span>
                </Link>
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

const mapSTP = ({ entities: { users }, session: { currentUser } }, ownProps) => ({
  currentUser,
  user: users[ownProps.match.params.id]
});

const mapDTP = dispatch => ({
  openModal: (modal, id) => dispatch(openModal(modal, id)),
  createConnection: connection => dispatch(createConnection(connection))
});

const UserDetailContainer = withRouter(connect(mapSTP, mapDTP)(UserDetail));

export default UserDetailContainer;