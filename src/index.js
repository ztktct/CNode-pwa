import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './style/index.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// onTouchTap()
injectTapEventPlugin();

ReactDOM.render(
    <Router>
        <App/>
    </Router>,
    document.getElementById('root'));

registerServiceWorker();
