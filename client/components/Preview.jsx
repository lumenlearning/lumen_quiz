import React from 'react';
import Rebase from 're-base';
import PreviewQuestion from './PreviewQuestion.jsx'

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  componentDidMount(){
    this.ref = base.fetch(`${this.props.params.quiz_id}/questions`, {
      context: this,
      state: 'questions',
      asArray:true,
      then(data) {
        this.setState({
          questions: data
        })
      }
    });
  }

  questions() {
    let questions = []
    {this.state.questions.map((question) => {
      questions.push(<PreviewQuestion 
        key = {question.key}
        id = {question.key}
        answers = {question.answers}
        content = {question.content}
        quiz_id = {this.props.params.quiz_id}
        history = {this.props.history}
      />)
    })}
    return questions
  }

  render() {
    return (
      <div>
        {this.questions()}
      </div>
    )
  }
}