import React from 'react';
import AnswerForm from './AnswerForm.jsx';
import Rebase from 're-base';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      content: '',
      quizName: ''
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
    base.syncState(`${this.props.params.quiz_id}/questions/${this.props.params.question_id}/answers`, {
      context: this,
      state: 'answers',
      asArray: true
    });
  }

  setQuestionRef(ref){
    this.question = ref;
  }

  answerFields() {
    var answers = []
    for (var i = 0; i < this.state.answers.length; i++) {
      answers.push(
        <AnswerForm
          key={this.state.answers[i].key}
          quiz_id={this.props.params.quiz_id}
          question_id = {this.props.params.question_id}
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
        <h2>{this.state.quizName}</h2>
        <h4>Enter your question below, followed by the answers.</h4>
          <label htmlFor='question'></label>
          <textarea type='text' className="style2" placeholder="Enter a question" id='question' ref={(ref) => this.setQuestionRef(ref)}/>
          <br />
          <h4>Click on the '+' symbol to add another answer to this question. Click on the 'x' to delete it.</h4>
          {this.answerFields()}
          
          <button className="btn1" onClick={() => this.addAnswerField()}>+</button><br /><br />

          <button className="btn2" onClick={() => this.handleAddQuestion()}>CREATE QUESTION</button>
      </div>
    )
  }

  handleAddQuestion() {

  }

  deleteAnswerField(id) {
    this.setState({
      answers: this.state.answers.filter((obj) => {return obj.key !== id})
    })
  }

  addAnswerField() {
    base.push(`${this.props.params.quiz_id}/questions/${this.props.params.question_id}/answers`, {
      data: {content: ''}
    });
  }
}
