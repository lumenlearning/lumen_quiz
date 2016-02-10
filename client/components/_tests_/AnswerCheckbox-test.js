import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';
import AnswerCheckbox from '../Answers/AnswerCheckbox.jsx';
import Checkbox from 'material-ui/lib/checkbox';
import Rebase from 're-base';
import Firebase from'firebase';
const firebaseUrl = 'https://lumenquiz.firebaseio.com/';
const ref = new Firebase(firebaseUrl);
var base;
const params = {
        quiz_id: "f48ca5cb-0389-407c-a6cf-c33dfs2ae939",
        question_id: 'thisisatest'
    };

describe('AnswerCheckbox', () => {

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

  it('changes state based on answer checkbox', (done) => {
    let answer = TestUtils.renderIntoDocument(<AnswerCheckbox params={params} />);
    let answerCheckbox = TestUtils.findRenderedComponentWithType(answer, Checkbox);
    let box = TestUtils.findRenderedDOMComponentWithTag(answer, 'input')
    TestUtils.Simulate.click(box);
    expect(answer.state.correct).toBe(true);
    done();
  });

});