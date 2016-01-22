import React from 'react';
import Main from '../components/Main';
import Home from '../components/Home';
import Questions from '../components/Questions';
import Question from '../components/Question';
import Preview from '../components/Preview';
import { Route, IndexRoute, Router } from 'react-router';

export default class NotFound extends React.Component {
  render() {
    return (
      <h1>NO HEREEEEEEEE</h1>
    )
  }
}

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Home} />
    <Route path="quiz" component={Questions} >
      <Route path="preview" component={Preview} />
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
);