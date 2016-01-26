import React from 'react';

export default class AddAnswer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      value: ''
    }
  }

  componentDidMount() {
    base.fetch(`${this.props.params.quiz_id}/questions/${this.props.params.question_id}/answers/`, {
      context: this,
      state: 'name',
      then(data){
        this.setState({
          quizName: data.name
        })
      }
    });
  }

  setAnswerRef(ref){
    this.answer = ref;
  }

  render() {
    return (
      <fieldset>
        <label htmlFor='answer'></label>
        <input type='text' className="form-control" placeholder="Enter an answer" value={this.state.value} ref={(ref) => this.setAnswerRef(ref)} onChange ={() => this.handleAddAnswer()} />
        <button onClick={() => this.deleteAnswerField()}>x</button>
      </fieldset>
    )
  }

  deleteAnswerField() {

  }

  handleAddAnswer() {
    this.setState({
      value: this.answer.value
    });
    this.props.handleAddAnswer(this.state);
  }
}
