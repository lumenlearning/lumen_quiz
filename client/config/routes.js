import React from 'react';
import Main from '../components/Main';
import Home from '../components/Home';
import Questions from '../components/Questions';
import Question from '../components/Question';
import Preview from '../components/Preview';
import {createHistory} from 'history';
import { Route, IndexRoute, Router } from 'react-router';

export default class NotFound extends React.Component {
  render() {
    return (
      <h1>NO HEREEEEEEEE</h1>
    )
  }
}

export default (
  <Router history={createHistory()}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="quizzes/:quiz_id" component={Questions} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);