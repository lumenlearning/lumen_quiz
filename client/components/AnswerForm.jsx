import React from 'react';
import Rebase from 're-base';
import TextField from 'material-ui/lib/text-field';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class AddAnswer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    }
  }

  componentDidMount(){
    base.syncState(`${this.props.quiz_id}/questions/${this.props.question_id}/answers/${this.props.id}/content`, {
      context: this,
      state: 'content',
      asArray: false
    });
  }

  setAnswerRef(ref){
    this.answer = ref;
  }

  render() {
    return (
      <div>
        <label htmlFor='answer'></label>
        <TextField type='text' className="style1" placeholder="Enter an answer" value={this.state.content} ref={(ref) => this.setAnswerRef(ref)} onChange ={() => this.handleAnswer()} />
        <button className="btn1" onClick={() => this.deleteAnswerField()}>x</button>
      </div>
    )
  }



  deleteAnswerField() {
    this.props.deleteAnswerField(this.props.id);
  }

  handleAnswer() {
    console.log(this.answer.value)
  }
}
