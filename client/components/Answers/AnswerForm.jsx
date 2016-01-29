import React from 'react';
import Rebase from 're-base';
import TextField from 'material-ui/lib/text-field';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class AnswerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    }

    this.handleAnswer = this.handleAnswer.bind(this);
  }

  componentDidMount(){
    base.syncState(`${this.props.quiz_id}/questions/${this.props.question_id}/answers/${this.props.id}/content`, {
      context: this,
      state: 'content',
      asArray: false
    });
  }

  render() {
    return (
      <textarea value={this.state.content} onChange ={this.handleAnswer} />
    )
  }

  handleAnswer(e) {
    let val = e.target.value
    this.setState({
      content: val
    });
  }
}
