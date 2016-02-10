import React from 'react';
import PreviewQuestion from '../PreviewQuestion.jsx'
import TestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';
import QuestionData from './mock_data/QuestionContainer.js';
import Rebase from 're-base';
import Firebase from'firebase';
const firebaseUrl = 'https://lumenquiz.firebaseio.com/';
const ref = new Firebase(firebaseUrl);
var base;
const params = {
        quiz_id: "f48ca5cb-0389-407c-a6cf-c33dfs2ae939"
    };

const answers = [
      {
        "content": "I am a correct answer",
        "correct": "true"
      },
      {
        "content": "I am an incorrect answer",
        "correct": "false"
      }
    ]

describe('Preview', () => {

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

  it('renders', (done) => {
    let preview = TestUtils.renderIntoDocument(<PreviewQuestion         
        key = 'key'
        id = 'key'
        answers = {answers}
        content = "<p>I am a correct answer</p>" />);
    let box = TestUtils.findRenderedDOMComponentWithClass(preview, 'question-preview-content')
    console.log(preview.props.content)
    done();
  });
});