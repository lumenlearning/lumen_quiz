import React from 'react';

export default class AddAnswer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      value: ''
    }
  }

  setAnswerRef(ref){
    this.answer = ref;
  }

  render() {
    return (
      <fieldset>
        <label htmlFor='answer'></label>
        <input type='text' placeholder="Enter an answer" value={this.state.value} ref={(ref) => this.setAnswerRef(ref)} onChange ={() => this.handleAddAnswer()} />
      </fieldset>
    )
  }

  handleAddAnswer() {
    this.setState({
      value: this.answer.value
    });
    this.props.handleAddAnswer(this.state);
  }
}