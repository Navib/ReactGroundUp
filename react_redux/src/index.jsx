import { render } from 'react-dom'
import React from 'react';
import Users from './containers/users'
import { Provider } from 'react-redux';
import UsersStore from './store';
import App from './components/app';
import Home from './components/home';
import UserProfile from './containers/userProfile';
import { BrowserRouter, Route, IndexRoute } from 'react-router-dom';

render(
  <Provider store={UsersStore}>
    <BrowserRouter >
      <div>
        <Route path="/" component={App} />
        <Route exact path='/users' component={Users} />
        <Route path='/users/:userName' component={UserProfile} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
