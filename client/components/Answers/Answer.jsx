import React from 'react';
import AnswerCheckbox from './AnswerCheckbox.jsx';
import AnswerForm from './AnswerForm.jsx';
import Cancel from 'material-ui/lib/svg-icons/navigation/cancel';

const styles = {
  cancel: {
    cursor:'pointer', 
    position:'absolute', 
    top:'15px', 
    right:'20px', 
    width:'2rem', 
    height:'2rem'
  }
}

export default class Answer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="answer-wrapper">
        <AnswerCheckbox    
          quiz_id={this.props.quiz_id}
          question_id = {this.props.question_id}
          id={this.props.id}
        />
        <AnswerForm     
          quiz_id={this.props.quiz_id}
          question_id = {this.props.question_id}
          id={this.props.id}
        />
        <Cancel 
          className="btn1" 
          onClick={() => this.deleteAnswerField()}
          color={'#c83637'}
          hoverColor={'#b72f2f'}
          style={styles.cancel}
        />
      </div>
    )
  }

  validateAnswers() {
    this.props.validateAnswers();
  }

  deleteAnswerField() {
    this.props.deleteAnswerField(this.props.id);
  }
}
