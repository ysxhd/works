
import '@babel/polyfill';
import './index.scss';
import favicon from './images/favicon.ico';
import React from 'react';
import { render } from 'react-dom';
import App from './components/app/App';
render(
    <App />,
    document.getElementById('appEntry')
);
