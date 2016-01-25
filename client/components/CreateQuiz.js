import React from 'react';
import Rebase from 're-base';
import uuid from 'node-uuid';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class CreateQuiz extends React.Component {
  render() {
    return (
      <div className="container">
        <h2>Quiz Title</h2>
        <fieldset>
          <label htmlFor='title'></label>
          <input type='text' id='title' ref={(ref) => this.setRef(ref)}/>
          <br />
          <button bsStyle="primary" onClick={() => this.handleSubmit()} >Add Questions</button>
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
    base.post(quizID, {
      data: {name: quizName}
    });
    this.props.history.pushState(null, "/quizzes/" + quizID)
  }
}