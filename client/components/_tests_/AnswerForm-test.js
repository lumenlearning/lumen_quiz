import React from 'react';
import AnswersContainer from '../Answers/AnswersContainer.jsx';
import TestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';
import AnswerForm from '../Answers/AnswerForm.jsx';
import Rebase from 're-base';
import Firebase from'firebase';
const firebaseUrl = 'https://lumenquiz.firebaseio.com/';
const ref = new Firebase(firebaseUrl);
var base;
const params = {
        quiz_id: "f48ca5cb-0389-407c-a6cf-c33dfs2ae939",
        question_id: 'thisisatest'
    };
 
describe('AnswerForm', () => {

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

  it('changes state based on answer input', (done) => {
    let answer = TestUtils.renderIntoDocument(<AnswerForm params={params} />);
    let answerInput = TestUtils.findRenderedDOMComponentWithTag(answer, 'textarea');
    answerInput.value = 'testing123'
    TestUtils.Simulate.change(answerInput);
    expect(answer.state.content).toBe('testing123');
    done();
  });

});