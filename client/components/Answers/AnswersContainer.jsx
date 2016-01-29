import React from 'react';
import Answer from './Answer.jsx';
import Rebase from 're-base';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class AnswersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    }
  }

  componentDidMount(){
    this.ref = base.syncState(`${this.props.quiz_id}/questions/${this.props.question_id}/answers`, {
      context: this,
      state: 'answers',
      asArray: true
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.question_id !== nextProps.question_id) {
      base.removeBinding(this.ref);
      this.ref = base.syncState(`${this.props.quiz_id}/questions/${nextProps.question_id}/answers`, {
        context: this,
        state: 'answers',
        asArray: true
      });
    }
  }

  answerFields() {
    var answers = []
    for (var i = 0; i < this.state.answers.length; i++) {
      answers.push(
        <Answer 
          key={this.state.answers[i].key}
          quiz_id={this.props.quiz_id}
          question_id = {this.props.question_id}
          id={this.state.answers[i].key}
          deleteAnswerField={(id) => this.deleteAnswerField(id)}
        />
      )
    }
    return answers
  }

  render() {
    return (
      <div>
        {this.answerFields()}
        <br /><br />
        <FloatingActionButton 
          mini={true} 
          backgroundColor={'#4bbf6b'}
          labelColor={'#fff'} 
          onClick={() => this.addAnswerField()}>
          <ContentAdd />
        </FloatingActionButton><br /><br />
      </div>
    )
  }

  deleteAnswerField(id) {
    this.setState({
      answers: this.state.answers.filter((obj) => {return obj.key !== id})
    });
  }

  addAnswerField() {
    base.push(`${this.props.quiz_id}/questions/${this.props.question_id}/answers`, {
      data: {content:'', correct:false}
    });
  }


}
