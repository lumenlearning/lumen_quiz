import React from 'react';
import QuestionContent from './QuestionContent.jsx'
import AnswersContainer from './AnswersContainer.jsx';
import Rebase from 're-base';
import { State } from 'react-router'


const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
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
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.question_id !== nextProps.params.question_id) {
      this.setState({
        question_id: nextProps.params.question_id
      })
    }
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
      }
    });
  }

}
