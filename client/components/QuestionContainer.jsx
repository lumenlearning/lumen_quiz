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
      question_id: this.props.params.question_id,
      question: '',
      errorMessage: '',
      open: false
    }
  }

  componentDidMount(){
    base.syncState(`${this.props.params.quiz_id}/questions/${this.props.params.question_id}`, {
      context: this,
      state: 'question',
      asArray: false
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.question_id !== nextProps.params.question_id) {
      this.setState({
        question_id: nextProps.params.question_id
      })
    }
  }

  handleError(e, errors) {
    this.setState({
      open: true,
      anchorEl: e.currentTarget,
      errorMessage: errors
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
        <h2>Add Question</h2>
        <h5>Add your question below.</h5>
        <QuestionContent 
          quiz_id={this.props.params.quiz_id} 
          question_id = {this.state.question_id}
        />
        <br />
          <h5>To add another answer field click on the +. To Delete an answer, click on the x. </h5>
        <AnswersContainer 
          quiz_id={this.props.params.quiz_id} 
          question_id = {this.state.question_id}
        />
        <br />
        <RaisedButton 
          label="Add Question" 
          onClick={(e) => this.validate(e)} 
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

  validate(e) {
    let errors = ''
    let emptyAnswers = []
    let checkedAnswers = []
    for (let i=0; i<this.state.question.answers.length; i++) {
      if (this.state.question.answers[i].content === '') {
        emptyAnswers.push(this.state.question.answers[i])
      }
      if (this.state.question.answers[i].correct === true) {
        checkedAnswers.push(this.state.question.answers[i])
      }
    }
    if (this.state.question.content === '') {
      errors = errors + "You must fill out the question field. " 
    }
    if (emptyAnswers.length > 0 ) {
      errors = errors + "You must fill out all of the answer fields or delete empty ones. " 
    }
    if (checkedAnswers.length === 0 ) {
      errors = errors + "You must include at least one correct answer." 
    }
    if (errors !== '') {
      this.handleError(e, errors)
    } else {
      this.submitQuestion();
    }
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
          data: {content:'', correct:false}
        });
        this.props.history.pushState(null, "/quizzes/" + quizID + '/questions/' + questionID)
      }
    });  
  }

}
