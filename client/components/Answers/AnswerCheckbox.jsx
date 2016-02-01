import React from 'react';
import Rebase from 're-base';
import Checkbox from 'material-ui/lib/checkbox';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class AnswerCheckbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      correct: false
    }
  }

  componentDidMount(){
    base.syncState(`${this.props.quiz_id}/questions/${this.props.question_id}/answers/${this.props.id}/correct`, {
      context: this,
      state: 'correct',
      asArray: false
    });
    this.validateAnswers();
  }

  render() {
    return (
      <Checkbox
        label=''
        onClick={() => this.correctnessToggle()}
        onBlur={() => this.validateAnswers()}
        checked={this.state.correct}
        iconStyle={{fill:'rgb(75, 191, 107)', width:'2rem', height:'2rem'}}
        style={{position:'absolute', top:'10px', width:'10px'}}
      />
    )
  }

  validateAnswers() {
    this.props.validateAnswers();
  }

  correctnessToggle() {
    this.state.correct ? this.setState({correct:false}) : this.setState({correct:true})
  }
}
