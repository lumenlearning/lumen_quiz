import React from 'react';
import Main from '../components/Main';
import CreateQuiz from '../components/CreateQuiz';
import Preview from '../components/Preview';
import AddQuestion from '../components/AddQuestion';
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
      <IndexRoute component={CreateQuiz} />
      <Route path="quizzes/:quiz_id/questions/:question_id" component={AddQuestion} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);