import React from 'react';
import Rebase from 're-base';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  componentDidMount(){
    base.fetch(this.props.params.quiz_id, {
      context: this,
      state: 'questions',
      then(data){
        this.setState({
          questions: data.questions
        })
      }
    });
  }
  render() {
    return (
      <h1>MOPOOSDAFdsf</h1>
    )
  }
}