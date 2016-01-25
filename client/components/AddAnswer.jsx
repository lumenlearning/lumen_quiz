import React from 'react';

export default class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
  }

  setAnswerRef(ref){
    this.answer = ref;
  }

  render() {
    return (
      <fieldset>
        <label htmlFor='answer'></label>
        <input type='text' ref={(ref) => this.setAnswerRef(ref)} onChange ={() => this.handleAddAnswer()} />
      </fieldset>
    )
  }

  handleAddAnswer() {
    var newAnswer = this.answer.value;
    console.log(newAnswer);
  }
}