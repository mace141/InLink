import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');

  const user = window.currentUser
  let preloadedState;
  if (user) {
    const { id } = user;
    preloadedState = {
      entities: { users: { [id]: user } },
      session: { currentUser: id }
    };
  } 
  const store = configureStore(preloadedState);

  window.getState = store.getState;
  window.dispatch = store.dispatch;

  ReactDOM.render(<Root store={store}/>, root);
});

// $.ajax({method:'POST', url: '/api/session', data: { user: { email: 'guest@user.com', password: 'password'}}})
// $.ajax({method: 'DELETE', url: '/api/session'})