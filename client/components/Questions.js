import React from 'react';
import Rebase from 're-base';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class Questions extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
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

  render() {
    return (
      <h1>{this.state.name}</h1>
    )
  }
}