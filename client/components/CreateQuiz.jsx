import React from 'react';
import Rebase from 're-base';
import uuid from 'node-uuid';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class CreateQuiz extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {errorText: null}
  }

  render() {
    const styles = {
      button: {
        backgroundColor: '#4bbf6b',
      }
    }

    return (
      <div>
        <h2>Name Your Quiz</h2>
          <label htmlFor='title'></label>
          <TextField
            autoFocus={true}
            errorText={this.state.errorText}
            id='title'
            ref={"quizTitle"}
            underlineStyle={{borderColor:'rgba(0,0,0,0.2)'}}
            underlineFocusStyle={{borderColor:'#4bbf6b'}}
          />
          <br /><br />
          <RaisedButton
            id="menu-button"
            label="Add Questions"
            onClick={() => this.handleSubmit()}
            backgroundColor={'#4bbf6b'}
            labelColor={'#fff'}
          />
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
