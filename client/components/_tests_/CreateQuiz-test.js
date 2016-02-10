import React from 'react';
import CreateQuiz from '../CreateQuiz.jsx'
import TestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';
import Rebase from 're-base';
var Firebase = require('firebase');
var firebaseUrl = 'https://lumenquiz.firebaseio.com/';
var ref = new Firebase(firebaseUrl);
var base;
 
describe('CreateQuiz', () => {
  beforeEach(function(done){
    base = Rebase.createClass(firebaseUrl);
    ref.set(null, done);
  });

  afterEach(function(done){
    ReactDOM.unmountComponentAtNode(document.body);
    base.reset();
    base = null;
    done();
  });

  it('renders', () => {
    let element = TestUtils.renderIntoDocument(<CreateQuiz />);
    expect(element).toBeTruthy();
  });

  it('should trigger error message upon empty submission', () => {
    let element = TestUtils.renderIntoDocument(<CreateQuiz />);
    let input = TestUtils.findRenderedDOMComponentWithClass(element, 'title-input');
    input.value = ''
    let submitBtn = TestUtils.findRenderedDOMComponentWithClass(element, 'submit-btn');
    let SubmitBtn    = ReactDOM.findDOMNode(submitBtn);
    TestUtils.Simulate.click(SubmitBtn);
    expect(element.state.errorText).toBe('This field is required.')
  });
});