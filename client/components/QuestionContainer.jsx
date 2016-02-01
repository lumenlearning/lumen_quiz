import React from 'react';
import QuestionContent from './QuestionContent.jsx'
import AnswersContainer from './Answers/AnswersContainer.jsx';
import Rebase from 're-base';
import { State } from 'react-router'
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Popover from 'material-ui/lib/popover/popover';
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin();

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

const popoverStyles = {
  padding: '10px',
  fontWeight: '500',
  backgroundColor: '#c83637',
  color: '#fff'
}

export default class QuestionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizName: '',
      question_id: this.props.params.question_id,
      validQuestion: false,
      validAnswerFields: false,
      validAnswerCheckboxes: false,
      errorMessage: '',
      open: false
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

  handleError(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose(){
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <h2>{this.state.quizName}</h2>
        <h5>Add your question below.</h5>
        <QuestionContent 
          quiz_id={this.props.params.quiz_id} 
          question_id = {this.state.question_id}
          validateQuestion = {()=>this.validateQuestion()} 
          invalidateQuestion = {()=>this.invalidateQuestion()} 
        />
        <br />
          <h5>To add another answer field click on the +. To Delete an answer, click on the x. </h5>
        <AnswersContainer 
          quiz_id={this.props.params.quiz_id} 
          question_id = {this.state.question_id}
          validateAnswerFields = {()=>this.validateAnswerFields()}
          invalidateAnswerFields = {()=>this.invalidateAnswerFields()}
          validateAnswerCheckboxes = {()=>this.validateAnswerCheckboxes()}
          invalidateAnswerCheckboxes = {()=>this.invalidateAnswerCheckboxes()}
        />
        <br />
        <RaisedButton 
          label="Add Question" 
          onClick={(e) => this.submitQuestion(e)} 
          backgroundColor={'#4bbf6b'}
          labelColor={'#fff'}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'middle', vertical: 'top'}}
          targetOrigin={{horizontal: 'middle', vertical: 'top'}}
          onRequestClose={() => this.handleRequestClose()}
        >
          <div style={popoverStyles}>{this.state.errorMessage}</div>
        </Popover>
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

  submitQuestion(e) {
    const quizID = this.props.params.quiz_id

    if (this.state.validQuestion === false) {
      this.setState({
        errorMessage: "You must fill out the question field."
      })
      this.handleError(e)
    } else if (this.state.validAnswerFields === false) {
      this.setState({
        errorMessage: "You must fill out all of the answer fields or delete empty ones."
      })
      this.handleError(e)
    } else if (this.state.validAnswerCheckboxes === false) {
      this.setState({
        errorMessage: "You must include at least one correct answer."
      })
      this.handleError(e)
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
