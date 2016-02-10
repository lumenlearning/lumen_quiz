import React from 'react';
import QuestionContainer from '../QuestionContainer.jsx'
import QuestionContent from '../QuestionContent.jsx'
import AnswersContainer from '../Answers/AnswersContainer.jsx';
import TinyMCEInput from 'react-tinymce-input';
import TestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';
import QuestionData from './mock_data/QuestionContainer.js';
import AnswerForm from '../Answers/AnswerForm.jsx';
import AnswerCheckbox from '../Answers/AnswerCheckbox.jsx';
import Checkbox from 'material-ui/lib/checkbox';
import Rebase from 're-base';
import Firebase from'firebase';
const firebaseUrl = 'https://lumenquiz.firebaseio.com/';
const ref = new Firebase(firebaseUrl);
var base;
const params = {
        quiz_id: "f48ca5cb-0389-407c-a6cf-c33dfs2ae939",
        question_id: "-K9nWtsffQsr_McDZW30"
    };
 
describe('QuestionContainer', () => {

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

  it('changes state based on answer checkbox', (done) => {
    let answer = TestUtils.renderIntoDocument(<AnswerCheckbox params={params} />);
    let answerCheckbox = TestUtils.findRenderedComponentWithType(answer, Checkbox);
    let box = TestUtils.findRenderedDOMComponentWithTag(answer, 'input')
    TestUtils.Simulate.click(box);
    expect(answer.state.correct).toBe(true);
    done();
  });

  it('changes state based on question content', (done) => {
    let element = TestUtils.renderIntoDocument(<QuestionContainer params={params} />, document.body);
    let content = TestUtils.findRenderedComponentWithType(element, QuestionContent)
    let tiny = TestUtils.findRenderedComponentWithType(content, TinyMCEInput)
    let moo = TestUtils.findRenderedDOMComponentWithTag(tiny, 'div')
    moo.value = "taco"
    TestUtils.Simulate.change(tiny);
    console.log(tiny.state)
    done();
  });

});