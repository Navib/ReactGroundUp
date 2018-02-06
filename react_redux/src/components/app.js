import React from 'react';
import NavBar from './navBar';

const App = (props) => (
  <div className="appComp">
    <NavBar />
    <div>
      <h1>This is our App component</h1>
      {props.children}
    </div>
  </div>
)
 export default App;
