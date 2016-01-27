import React from 'react';
import QuestionContent from './QuestionContent.jsx'
import AnswersContainer from './AnswersContainer.jsx';
import Rebase from 're-base';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      content: '',
      quizName: '',
      question_id: this.props.params.question_id
    }
  }

  componentDidMount(){
    base.fetch(this.props.params.quiz_id, {
      context: this,
      state: 'name',
      then(data){
        this.setState({
          quizName: data.name
        })
      }
    });
    this.ref = base.syncState(`${this.props.params.quiz_id}/questions/${this.state.question_id}`, {
      context: this,
      state: 'content',
      asArray: false
    });
  }

  componentWillReceveProps(obj) {
    base.removeBinding(this.ref);
    this.ref = base.syncState(`${this.props.params.quiz_id}/questions/${this.state.question_id}`, {
      context: this,
      state: 'content',
      asArray: false
    });
  }

  answerFields() {
    var answers = []
    for (var i = 0; i < this.state.answers.length; i++) {
      answers.push(
        <AnswerForm
          key={this.state.answers[i].key}
          quiz_id={this.props.params.quiz_id}
          question_id = {this.state.question_id}
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
        <h2>Add Questions to {this.state.quizName}</h2>
        < QuestionContent quiz_id={this.props.params.quiz_id} question_id = {this.state.question_id} />
        <br />
        < AnswersContainer quiz_id={this.props.params.quiz_id} question_id = {this.state.question_id}/>
        <button className="btn btn-success" onClick={() => this.submitQuestion()}>CREATE QUESTION</button>
      </div>
    )
  }

  submitQuestion() {
    const quizID = this.props.params.quiz_id

    base.push(`${quizID}/questions`, {
      data: {content: ''}
    });
    base.fetch(`${quizID}`, {
      context: this,
      state: 'questions',
      then(data){
        const questionID = Object.keys(data.questions)[Object.keys(data.questions).length - 1]
        base.push(`${quizID}/questions/${questionID}/answers`, {
          data: {content: ''}
        });
        this.props.history.pushState(null, "/quizzes/" + quizID + '/questions/' + questionID)
        this.setState({
          question_id: questionID
        })
      }
    });
  }

}
