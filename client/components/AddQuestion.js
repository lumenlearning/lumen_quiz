import React from 'react';
import AnswerForm from './AnswerForm.jsx';
import Rebase from 're-base';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      answerCount: 1,
      content: ''
    }
  }

  componentDidMount(){
    const content = this.state.content
    base.fetch(this.state.quizID, {
      context: this,
      state: 'name',
      then(data){
        this.setState({
          quizName: data.name
        })
      }
    });
  }

  setQuestionRef(ref){
    this.question = ref;
  }

  answerFields() {
    var answers = []
    for (var i = 0; i < this.state.answerCount; i++) {
      answers.push(<AnswerForm key={i} id={i} handleAddAnswer={(answer) => this.addAnswer(answer)} />  )
    }
    return answers
  }

  render() {
    return (
      <div>
        <h2>Add Questions</h2>
        <fieldset>
          <label htmlFor='question'></label>
          <textarea type='text' placeholder="Enter a question" id='question' ref={(ref) => this.setQuestionRef(ref)}/>
          <br />
          {this.answerFields()}   
          <button bsStyle="primary" onClick={() => this.handleAddQuestion()}>ADD QUESTION</button>
        </fieldset>
      </div>
    )
  }

  handleAddQuestion() {
    var newQuestion = this.question.value;
    this.question.value = '';
    this.props.handleAddQuestion(newQuestion)
  }

  addAnswer(answer) {

  }
}