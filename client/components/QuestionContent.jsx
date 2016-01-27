import React from 'react';
import Rebase from 're-base';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class QuestionContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }

  componentDidMount(){
    base.syncState(`${this.props.quiz_id}/questions/${this.props.question_id}/content`, {
      context: this,
      state: 'content',
      asArray: false
    });
  }

  setQuestionRef(ref){
    this.question = ref;
  }

  render() {
    return (
      <textarea onChange ={() => this.handleQuestion()} type='text' className="form-control" placeholder="Enter a question" value={this.state.content} id='question' ref={(ref) => this.setQuestionRef(ref)}/>
    )
  }

  handleQuestion() {
    this.setState({
      content: this.question.value
    })
  }

}
