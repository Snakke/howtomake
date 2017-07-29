import React from 'react';
import Toolbar from './toolbar.js';
import PagesContainer from './pages_container.js';
import ConnectionState from './connection_state.js'

const App = () => (
  <div>
    <ConnectionState />
    <Toolbar />
    <PagesContainer />
  </div>
);

export default App;
