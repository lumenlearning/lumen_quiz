import React from 'react';
import Rebase from 're-base';
import uuid from 'node-uuid';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class CreateQuiz extends React.Component {
  render() {
    return (
      <div>
        <h2>Quiz Title</h2>
        <fieldset>
          <label htmlFor='title'></label>
          <input type='text' className="form-control" placeholder="Enter a title" id='title' ref={(ref) => this.setRef(ref)}/>
          <br />
          <button type="btn" className="btn btn-danger" onClick={() => this.handleSubmit()} >Add Questions</button>
        </fieldset>
      </div>
    )
  }

  setRef(ref){
    this.quizNameRef = ref;
  }

  handleSubmit() {
    const quizName = this.quizNameRef.value;
    const quizID = uuid.v4();
    var questionID = '';
    base.post(quizID, {
      data: {name: quizName}
    });
    base.push(`${quizID}/questions`, {
      data: {content: ''}
    });
    base.fetch(`${quizID}`, {
      context: this,
      state: 'questions',
      then(data){
        questionID = Object.keys(data.questions)[0]
      }
    });
    base.push(`${quizID}/questions/${questionID}/answers`, {
      data: {content: ''}
    });
    this.props.history.pushState(null, "/quizzes/" + quizID + '/questions/' + questionID)
  }
}
