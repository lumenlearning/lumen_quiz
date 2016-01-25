import React from 'react';

export default class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  setRef(ref){
    this.question = ref;
  }

  render() {
    return (
      <fieldset>
        <label htmlFor='question'></label>
        <input type='text' id='question' ref={(ref) => this.setRef(ref)}/>
        <br />
        <button bsStyle="primary" onClick={() => this.handleAddQuestion()}>ADD QUESTION</button>
      </fieldset>
    )
  }

  handleAddQuestion() {
    console.log(this.question.value);
    var newQuestion = this.question.value;
    this.question.value = '';
    this.props.handleAddQuestion(newQuestion)
  }
}