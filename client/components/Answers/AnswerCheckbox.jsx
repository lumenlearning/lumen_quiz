import React from 'react';
import Rebase from 're-base';
import Checkbox from 'material-ui/lib/checkbox';
import CheckboxMultiple from 'material-ui/lib/svg-icons/action/check-circle';
import CheckboxSingle from 'material-ui/lib/svg-icons/toggle/radio-button-checked';
import Unchecked from 'material-ui/lib/svg-icons/toggle/radio-button-unchecked';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class AnswerCheckbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      correct: false
    }
  }

  componentDidMount(){
    this.ref = base.syncState(`${this.props.quiz_id}/questions/${this.props.question_id}/answers/${this.props.id}/correct`, {
      context: this,
      state: 'correct',
      asArray: false
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.question_id !== nextProps.question_id) {
      base.removeBinding(this.ref);
      this.ref = base.syncState(`${this.props.quiz_id}/questions/${this.props.question_id}/answers/${this.props.id}/correct`, {
        context: this,
        state: 'correct',
        asArray: false
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {

    return (
      <Checkbox
        label=''
        onClick={() => this.correctnessToggle()}
        checked={this.state.correct}
        iconStyle={{fill:'rgb(75, 191, 107)', width:'2rem', height:'2rem'}}
        style={{position:'absolute', top:'10px', width:'10px'}}
        checkedIcon={this.props.multipleCorrect ? <CheckboxMultiple /> : <CheckboxSingle />}
        unCheckedIcon={<Unchecked />}
      />
    )
  }

  correctnessToggle() {
    this.state.correct ? this.setState({correct:false}) : this.setState({correct:true})
  }
}
