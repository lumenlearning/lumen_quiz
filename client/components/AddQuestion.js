import React from 'react';
import AddAnswer from './AddAnswer.jsx'

export default class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    }
  }

  setQuestionRef(ref){
    this.question = ref;
  }

  render() {
    return (
      <div>
        <fieldset>
          <label htmlFor='question'></label>
          <input type='text' id='question' ref={(ref) => this.setQuestionRef(ref)}/>
          <br />
          <button bsStyle="primary" onClick={() => this.handleAddQuestion()}>ADD QUESTION</button>
        </fieldset>
        <AddAnswer />
      </div>
    )
  }

  handleAddQuestion() {
    var newQuestion = this.question.value;
    this.question.value = '';
    this.props.handleAddQuestion(newQuestion)
  }
}