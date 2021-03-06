'use strict';

import React from 'react';
import Root from '../app/root';
import createHistory from 'history/lib/createMemoryHistory';
import { reduxReactRouter } from 'redux-router/server';
import Matter from 'kyper-matter';

import configureStore from '../app/store/configureStore';


export default (cb) => {
  // Compile an initial state
  let matter = new Matter('chatter');
  const initialState = {
    auth: {
      account: matter.currentUser
    }
  }

  // Create a new Redux store instance
  const store = configureStore(initialState, reduxReactRouter, createHistory);

  // Grab the initial state from our Redux store
  const finalState = store.getState();

  return cb({
    appData: finalState,
    appMarkup: React.renderToString(<Root store={ store } />)
  });
}
