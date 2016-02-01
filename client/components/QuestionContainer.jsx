import React from 'react';
import QuestionContent from './QuestionContent.jsx'
import AnswersContainer from './Answers/AnswersContainer.jsx';
import Rebase from 're-base';
import { State } from 'react-router'
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Validator from 'validator';


const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class QuestionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizName: '',
      question_id: this.props.params.question_id,
      validQuestion: false,
      validAnswerFields: false,
      validAnswerCheckboxes: false
    }
  }

  componentDidMount(){
    base.fetch(`${this.props.params.quiz_id}/name`, {
      context: this,
      state: 'name',
      then(data){
        this.setState({
          quizName: data
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
        <h5 onClick={()=>this.validQuestion()}>Add your question below.</h5>
        < QuestionContent 
          quiz_id={this.props.params.quiz_id} 
          question_id = {this.state.question_id}
          validateQuestion = {()=>this.validateQuestion()} 
          invalidateQuestion = {()=>this.invalidateQuestion()} 
        />
        <br />
          <h5>To add another answer field click on the +. To Delete an answer, click on the x. </h5>
        < AnswersContainer 
          quiz_id={this.props.params.quiz_id} 
          question_id = {this.state.question_id}
          validateAnswerFields = {()=>this.validateAnswerFields()}
          invalidateAnswerFields = {()=>this.invalidateAnswerFields()}
          validateAnswerCheckboxes = {()=>this.validateAnswerCheckboxes()}
          invalidateAnswerCheckboxes = {()=>this.invalidateAnswerCheckboxes()}
        /><br />
        <RaisedButton 
          label="Add Question" 
          onClick={() => this.submitQuestion()} 
          backgroundColor={'#4bbf6b'}
          labelColor={'#fff'}
        />
      </div>
    )
  }

  validateQuestion() {
    this.setState({
      validQuestion: true
    })
  }

  invalidateQuestion() {
    this.setState({
      validQuestion: false
    })
  }

  validateAnswerFields() {
    this.setState({
      validAnswerFields: true
    })
  }

  invalidateAnswerFields() {
    this.setState({
      validAnswerFields: false
    })
  }

  validateAnswerCheckboxes() {
    this.setState({
      validAnswerCheckboxes: true
    })
  }

  invalidateAnswerCheckboxes() {
    this.setState({
      validAnswerCheckboxes: false
    })
  }

  submitQuestion() {
    const quizID = this.props.params.quiz_id

    if (this.state.validQuestion === false) {
      alert('invalid question')
    } else if (this.state.validAnswerFields === false) {
      alert('invalid answer content')
    } else if (this.state.validAnswerCheckboxes === false) {
      alert('no checked answers')
    } else {
      base.push(`${quizID}/questions`, {
        data: {content: ''}
      });
      base.fetch(`${quizID}`, {
        context: this,
        state: 'questions',
        then(data){
          const questionID = Object.keys(data.questions)[Object.keys(data.questions).length - 1]
          base.push(`${quizID}/questions/${questionID}/answers`, {
            data: {content:'', correct:false}
          });
          this.props.history.pushState(null, "/quizzes/" + quizID + '/questions/' + questionID)
        }
      });  
    }
  }

}
