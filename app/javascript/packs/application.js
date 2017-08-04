import 'bootstrap';
import Rails from 'rails-ujs';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import manual from '../reducers/manual.js';
import connection from '../reducers/connection.js'
import App from '../components/app.js';
import Dropzone from 'dropzone';
import rateit from 'jquery.rateit';
import '../jinplace';
import '../awesomplete';

import '../styles/application.scss';

document.addEventListener("DOMContentLoaded", () => {
  Rails.start();
  const rootElement = $('#manual');
  if (rootElement.length>0) {
    const data = rootElement.data('initialState');

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const rootReducer = combineReducers({ manual, connection });
    const store = createStore(rootReducer,
                              fromJS({manual: data, connection: {connected: false}}),
                              composeEnhancers(applyMiddleware(thunk)));

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      rootElement[0]
    );
  }

  const profile = $('#profile-image');
  if ( profile.length>0 && profile.data("can-edit")) {

    var myDropzone = new Dropzone(document.getElementById('image'), {
      uploadMultiple: false,
      acceptedFiles:'.jpg,.png,.jpeg,.gif',
      url: 'https://api.cloudinary.com/v1_1/snake/image/upload',
    });
    myDropzone.on('sending', function (file, xhr, formData) {
      console.log(xhr)
      formData.append('api_key', 123788616947241);
      formData.append('timestamp', Date.now() / 1000 | 0);
      formData.append('upload_preset', 'cobgfeow');
    });
    myDropzone.on('success', function (file, response) {
      console.log('Success! Cloudinary public ID is', response.public_id);
      $.ajax({
        url: "/users/"+profile.data("user-id"),    
        type: 'PATCH',   
        dataType:'json',    
        data: { user: { image: response.public_id } },
      });
      $("#image").attr("src","http://res.cloudinary.com/snake/image/upload/c_fill,h_200,w_200/" + response.public_id);
    });
  }

  const tags = $('#tag_field');
  if (tags.length>0) {
    new Awesomplete('input[data-multiple]', {
      filter: function(text, input) {
        return Awesomplete.FILTER_CONTAINS(text, input.match(/[^,]*$/)[0]);
      },

      item: function(text, input) {
        return Awesomplete.ITEM(text, input.match(/[^,]*$/)[0]);
      },

      replace: function(text) {
        var before = this.input.value.match(/^.+,\s*|/)[0];
        this.input.value = before + text + ", ";
      }
    });
  }

  const stars = $('.rateit');
  if (stars.length>0){
    stars.rateit({max: 5, mode: "font", step: 1, resetable: false});
    const url = stars.data('url');
    stars.bind('rated', function() { 
      $.ajax({
        url: url,    
        type: 'POST',   
        dataType:'json',    
        data: { value: $(this).rateit('value') },
      });
    });  
  }

  const user_edit = $('.editable');
  if (user_edit.length>0){
    $('.editable').jinplace({
      submitFunction: function(opts, value) {
          let data = {};
          data[opts.attribute] = value;
          let data2 = {};
          data2[opts.object] = data;
          return new Promise(function(resolve, reject) {
           $.ajax(opts.url, {
                      type: "PATCH",
                      data: data2,
                      dataType: 'JSON',
                      success: () => {
                        resolve(value);
                      }
                  });
         });
      }
    });
  }
});
