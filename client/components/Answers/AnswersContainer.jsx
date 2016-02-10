import React from 'react';
import Answer from './Answer.jsx';
import Rebase from 're-base';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FlatButton from 'material-ui/lib/flat-button';
import AddCircleOutline from 'material-ui/lib/svg-icons/content/add-circle-outline';
import Help from 'material-ui/lib/svg-icons/action/help-outline';
import Popover from 'material-ui/lib/popover/popover';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

const styles = {
  add: {
    cursor:'pointer', 
    top:'15px', 
    right:'20px', 
    width:'2rem', 
    height:'2rem'
  },
  help: {
    cursor:'pointer', 
    width:'1.4rem', 
    height:'1.4rem',
  },
  popover: {
    padding: '20px',
    fontWeight: '500',
    backgroundColor: '#245693',
    color: '#fff'
  }
}

export default class AnswersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      multipleCorrect: false,
      open: false,
      helpMessage: ''
    }
  }

  componentDidMount(){
    this.ref = base.syncState(`${this.props.quiz_id}/questions/${this.props.question_id}/answers`, {
      context: this,
      state: 'answers',
      asArray: true,
      then() {
        if (this.state.answers.length === 0) {
          base.post(`${this.props.quiz_id}/questions/${this.props.question_id}/answers/0`, {
            data: {content:'', correct:false}
          });
        }
        this.checkMultipleCorrect();
      }
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
      this.checkMultipleCorrect();
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
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
          multipleCorrect={this.state.multipleCorrect}
        />
      )
    }
    return answers
  }

  checkMultipleCorrect() {
    base.fetch(`${this.props.quiz_id}/questions/${this.props.question_id}/answers`, {
        context: this,
        then(answers) {
          let checkedAnswers = []
          for (var key in answers) {
            if (answers.hasOwnProperty(key) && answers[key].correct === true) {
              checkedAnswers.push(answers[key])
            }
            checkedAnswers.length > 1 ? this.setState({multipleCorrect: true}) : this.setState({multipleCorrect: false})
          }
        }
      });
  }

  render() {
    let header = this.state.multipleCorrect ? 'Answers: Multiple Correct' : 'Answers: Multiple Choice'
    return (
      <div onClick={() => this.checkMultipleCorrect()}>
          <h3>
            <Help 
              onClick={(e) => this.helpPopover(e)} 
              style={styles.help}
              color='#777'
              hoverColor='#333'
            />
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'middle', vertical: 'top'}}
              targetOrigin={{horizontal: 'middle', vertical: 'top'}}
              onRequestClose={() => this.handleRequestClose()}
              canAutoPosition={true}
            >
              <div style={styles.popover}>{this.state.helpMessage}</div>
            </Popover>
            &nbsp; {header}
          </h3>
        {this.answerFields()}

        <AddCircleOutline
        onClick={() => this.addAnswerField()}
        color={'#4bbf6b'}
        hoverColor={'#389652'}
        style={styles.add}
         />

        <br /><br />
      </div>
    )
  }

  helpPopover(e) {
    let message = "To mark an answer as correct, click on the checkbox on the left. \
    To delete, click on the red x to the right of the answer. \
    To add another answer, click on the green plus at the bottom."
    this.setState({
      open: true,
      anchorEl: e.currentTarget,
      helpMessage: message
    });
  }

  handleRequestClose(){
    this.setState({
      open: false,
    });
  };

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
