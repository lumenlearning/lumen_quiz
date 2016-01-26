import React from 'react';
import AnswersContainer from './AnswersContainer.jsx';
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
    base.syncState(`${this.props.params.quiz_id}/questions/${this.props.params.question_id}/content`, {
      context: this,
      state: 'content',
      asArray: false
    });

  }

  setQuestionRef(ref){
    this.question = ref;
  }

  render() {
    return (
      <div>
        <h2>Add Questions to {this.state.quizName}</h2>
        <label htmlFor='question'></label>
        <textarea onChange ={() => this.handleQuestion()} type='text' className="form-control" placeholder="Enter a question" value={this.state.content} id='question' ref={(ref) => this.setQuestionRef(ref)}/>
        <br />
        < AnswersContainer quiz_id={this.props.params.quiz_id} question_id = {this.props.params.question_id}/>
        <button onClick={() => this.addAnswerField()}>+</button><br />
        <button className="btn btn-success" onClick={() => this.submitQuestion()}>CREATE QUESTION</button>
      </div>
    )
  }

  submitQuestion() {

  }

  handleQuestion() {
    this.setState({
      content: this.question.value
    })
  }

}
