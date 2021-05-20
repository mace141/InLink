import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
    const { user, currentUser, match, openModal, lastEdu, lastExp } = this.props; 
    if (!user) return null;
    let editIntroBtn; let editSectionBtn;
    
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
          <div className='user-bg-img'><img src={user.background || window.defaultBg} alt="Background Pic"/></div>
          <div className='user-details'>
            <div className='pf-user-info'>
              <img src={user.profileUrl || window.defaultUser} alt="Profile Pic" className='pfp large'/>
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
  openModal: (modal, id) => dispatch(openModal(modal, id))
});

const UserDetailContainer = withRouter(connect(mapSTP, mapDTP)(UserDetail));

export default UserDetailContainer;