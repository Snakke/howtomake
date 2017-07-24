import React from 'react';
import Toolbar from './toolbar.js';
import Pages from './pages.js';
import ConnectionState from './connection_state.js'

const App = () => (
  <div>
    <ConnectionState />
    <Toolbar />
    <Pages />
  </div>
);

export default App;
