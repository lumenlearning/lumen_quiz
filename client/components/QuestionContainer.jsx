import React from 'react';
import QuestionContent from './QuestionContent.jsx';
import AnswersContainer from './Answers/AnswersContainer.jsx';
import GuidSearch from './GuidSearch.jsx';
import Rebase from 're-base';
import { State } from 'react-router'
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Help from 'material-ui/lib/svg-icons/action/help';
import Popover from 'material-ui/lib/popover/popover';
import injectTapEventPlugin from 'react-tap-event-plugin'
import ReactTooltip from "react-tooltip";
import FlatButton from 'material-ui/lib/flat-button';
import Outcomes from '../../outcomes.json';
var Typeahead = require('react-typeahead').Typeahead;

injectTapEventPlugin();

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

const styles = {
  help: {
    cursor:'pointer', 
    width:'1.25rem', 
    height:'1.25rem'
  }
}

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
      errorMessage: '',
      open: false
    }
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
          <FlatButton 
            className="top-button" 
            label="Save & Preview Quiz" 
            default={true} 
            onClick={(e) => this.previewQuiz(e)}
          />
        <GuidSearch 
          quiz_id = {this.props.params.quiz_id} 
          question_id = {this.state.question_id}
        />
        <h3>Question</h3>
        <QuestionContent 
          quiz_id={this.props.params.quiz_id} 
          question_id = {this.state.question_id}
        />
        <br />

          <h3>
          Answer  
          <Help 
          data-html={true}
          style={styles.help}
          color={'#767676'}
          data-tip="To mark an answer as correct, click on the checkbox on the left.
          <br>To delete, click on the red x to the right of the answer.
          <br>To add another answer, click on the green plus at the bottom." />
          <ReactTooltip />
          </h3>


        <AnswersContainer 
          quiz_id = {this.props.params.quiz_id} 
          question_id = {this.state.question_id}
        />
        <br />
        <RaisedButton 
          label="Save & Add Question" 
          onClick={(e) => this.fetchAndValidateQuestion(e)} 
          backgroundColor={'#4bbf6b'}
          labelColor={'#fff'}
          className='submit-button'
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

  fetchAndValidateQuestion(e) {
    base.fetch(`${this.props.params.quiz_id}/questions/${this.state.question_id}`, {
      context: this,
      then(data){
        this.validate(e, data)
      }
    });
  }

  validate(e, question) {
    let errors = ''
    let emptyAnswers = []
    let checkedAnswers = []
    let answers = question.answers
    for (var key in answers) {
      if (answers.hasOwnProperty(key) && answers[key].content === '') {
        emptyAnswers.push(answers[key])
      }
      if (answers.hasOwnProperty(key) && answers[key].correct === true) {
        checkedAnswers.push(answers[key])
      }
    }
    if (question.content === '') {
      errors = errors + "You must fill out the question field. " 
    }
    if (emptyAnswers.length > 0 ) {
      errors = errors + "You must fill out all of the answer fields or delete empty ones. " 
    }
    if (checkedAnswers.length === 0 ) {
      errors = errors + "You must include at least one correct answer. " 
    }
    if (!question.guid) {
      errors = errors + "You must align the question with a Learning Outcome." 
    }
    if (errors !== '') {
      this.handleError(e, errors)
    } else if (errors === '' && e.target.parentElement.parentElement.parentElement.className === 'submit-button') {
      this.submitQuestion();
    }
  }

  previewQuiz() {
    const quizID = this.props.params.quiz_id
    this.props.history.pushState(null, '/quizzes/' + quizID + '/preview')
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
