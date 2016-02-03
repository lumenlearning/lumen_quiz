import React from 'react';
import Rebase from 're-base';
import PreviewQuestion from './PreviewQuestion.jsx'
import FlatButton from 'material-ui/lib/flat-button';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  componentDidMount(){
    this.ref = base.syncState(`${this.props.params.quiz_id}/questions`, {
      context: this,
      state: 'questions',
      asArray:true
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
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
        question_id = {this.props.params.question_id}
        deleteQuestion = {(id) => this.deleteQuestion(id)}
      />)
    })}
    return questions
  }

  render() {
    return (
      <div>
        <FlatButton 
          className="top-button" 
          label="Add New Question" 
          default={true} 
          onClick={(e) => this.addNewQuestion(e)}
        />
        {this.questions()}
      </div>
    )
  }

  deleteQuestion(id) {
    this.setState({
      questions: this.state.questions.filter((obj) => {return obj.key !== id})
    });
  }

  addNewQuestion() {
    const quizID = this.props.params.quiz_id

    base.push(`${quizID}/questions`, {
      data: {content: ''}
    });
    base.fetch(`${quizID}`, {
      context: this,
      state: 'questions',
      then(data){
        const questionID = Object.keys(data.questions)[Object.keys(data.questions).length - 1]
        base.push(`${quizID}/questions/${questionID}/answers`, {
          data: {content:'', correct:false}
        });
        this.props.history.pushState(null, "/quizzes/" + quizID + '/questions/' + questionID)
      }
    });  
  }
}