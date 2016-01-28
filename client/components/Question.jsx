import React from 'react';
import QuestionContent from './QuestionContent.jsx'
import AnswersContainer from './AnswersContainer.jsx';
import Rebase from 're-base';
import { State } from 'react-router'
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';


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
        <h2>{this.state.quizName}</h2>
        <h5>Add your question below.</h5>
        < QuestionContent quiz_id={this.props.params.quiz_id} question_id = {this.state.question_id} />
        <br />
          <h5>To add another answer field click on the +. To Delete an answer, click on the x. </h5>
        < AnswersContainer quiz_id={this.props.params.quiz_id} question_id = {this.state.question_id}/><br />
        <RaisedButton 
          label="Add Question" 
          onClick={() => this.submitQuestion()} 
          backgroundColor={'#4bbf6b'}
          labelColor={'#fff'}
        />
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
