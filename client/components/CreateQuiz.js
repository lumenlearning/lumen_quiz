import React from 'react';
import Rebase from 're-base';
import uuid from 'node-uuid';
import TextField from 'material-ui/lib/text-field';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');


export default class CreateQuiz extends React.Component {

constructor(props, context) {
  super(props, context)
  this.state = {errorText: null}
}

  render() {
    return (
      <div>
        <h2>Quiz Title</h2>
          <label htmlFor='title'></label>
          <TextField hintText="Enter a title" errorText={this.state.errorText} id='title' ref={"quizTitle"} />
          <br />
          <br />
          <button className="btn2" onClick={() => this.handleSubmit()} >Add Questions</button>
      </div>
    )
  }


  handleSubmit() {
    if (this.refs.quizTitle.getValue() != "") {
      const quizName = this.refs.quizTitle.getValue();
      const quizID = uuid.v4();
      var questionID;




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
          questionID = Object.keys(data.questions)[Object.keys(data.questions).length - 1]
        }
      });
      base.push(`${quizID}/questions/${questionID}/answers`, {
        data: {content: ''}
      });
      this.props.history.pushState(null, "/quizzes/" + quizID + '/questions/' + questionID)
    } else {
        this.setState({
          errorText: "This field is required."
        });
    }
  }
}
