import React from 'react';
import Rebase from 're-base';
import AddQuestion from './AddQuestion';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class QuestionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizID: this.props.params.quiz_id,
      quizName: {},
      questions: []
    }
  }

  componentDidMount(){
    base.fetch(this.state.quizID, {
      context: this,
      state: 'name',
      then(data){
        this.setState({
          name: data.name
        })
      }
    });
  }

  setRef(ref){
    this.questionRef = ref;
  }

  render() {
    return (
      <div className="container">
        <h2>Add Questions to {this.state.name}</h2>
          <AddQuestion handleAddQuestion = {(newQuestion) => this.addQuestion(newQuestion)} />
      </div>
    )
  }

  addQuestion(question) {
    console.log(question)
    base.push(`${this.state.quizID}/questions`, {
      data: {question}
    });
  }
}