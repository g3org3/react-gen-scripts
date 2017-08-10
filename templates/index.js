import React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';

// Main Component
import Router from './Router';
import { Provider } from 'react-redux';
import store from './store/';
import theme from './config/theme';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <Router />
    </MuiThemeProvider>
  </Provider>
  ,document.getElementById('root')
);
// registerServiceWorker();
