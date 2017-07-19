import 'bootstrap';
import Rails from 'rails-ujs';
import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/application.scss';

document.addEventListener("DOMContentLoaded", () => {
  Rails.start();

  class App extends React.Component {
    render(){
      return (
        <div>
          <button>Create page</button>
        </div>
      );
    }
  }

  const rootElement = document.getElementById('manual');
  if (rootElement) {
    ReactDOM.render(<App />, rootElement);
  }
});