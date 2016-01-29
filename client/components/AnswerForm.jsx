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

    this.handleAnswer = this.handleAnswer.bind(this);
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
        <TextField value={this.state.content} underlineStyle={{borderColor:'rgba(0,0,0,0.2)'}} underlineFocusStyle={{borderColor:'#4bbf6b'}} ref={(ref) => this.setAnswerRef(ref)} onChange ={this.handleAnswer} />
        <button className="btn1" onClick={() => this.deleteAnswerField()}>x</button>
      </div>
    )
  }



  deleteAnswerField() {
    this.props.deleteAnswerField(this.props.id);
  }

  handleAnswer(e) {
    let val = e.target.value
    this.setState({
      content: val
    });
  }
}
