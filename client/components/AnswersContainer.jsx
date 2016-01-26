import React from 'react';
import AnswerForm from './AnswerForm.jsx';
import Rebase from 're-base';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    }
  }

  componentDidMount(){
    base.syncState(`${this.props.quiz_id}/questions/${this.props.question_id}/answers`, {
      context: this,
      state: 'answers',
      asArray: true
    });
  }

  answerFields() {
    var answers = []
    for (var i = 0; i < this.state.answers.length; i++) {
      answers.push(
        <AnswerForm 
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
        <button onClick={() => this.addAnswerField()}>+</button><br />
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
      data: {content: ''}
    });
  }


}