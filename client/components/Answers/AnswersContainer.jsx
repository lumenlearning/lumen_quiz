import React from 'react';
import Answer from './Answer.jsx';
import Rebase from 're-base';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FlatButton from 'material-ui/lib/flat-button';
import AddCircleOutline from 'material-ui/lib/svg-icons/content/add-circle-outline';


const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

const styles = {
  add: {
    cursor:'pointer', 
    top:'15px', 
    right:'20px', 
    width:'2rem', 
    height:'2rem'
  }
}

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
    if (this.state.answers.length === 0) {
      base.push(`${this.props.quiz_id}/questions/${this.props.question_id}/answers`, {
        data: {content:'', correct:false}
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
