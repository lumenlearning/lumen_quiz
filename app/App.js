import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import {createHistory} from 'history';
import routes from './config/routes.js';
import Bootstrap from 'react-bootstrap';
import './styles/app.scss';

ReactDOM.render(<Router history={createHistory()}>{routes}</Router>, document.getElementById('app'))