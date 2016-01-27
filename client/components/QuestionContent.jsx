import React from 'react';
import Rebase from 're-base';
import TinyMCE from 'react-tinymce';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class QuestionContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }

  componentDidMount(){
    this.ref = base.syncState(`${this.props.quiz_id}/questions/${this.props.question_id}/content`, {
      context: this,
      state: 'content',
      asArray: false
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.question_id !== nextProps.question_id) {
      base.removeBinding(this.ref);
      this.ref = base.syncState(`${this.props.quiz_id}/questions/${nextProps.question_id}/content`, {
        context: this,
        state: 'content',
        asArray: false
      });
    }
  }

  render() {
    return (
      <div>
      <TinyMCE
        content={this.state.content}
        config={{
          plugins: 'autolink link image lists preview',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
        }}
        onChange ={(e) => this.handleQuestion(e)}
        onBlur ={(e) => this.handleQuestion(e)}  
        className="form-control" 
      />
      </div>
    )
  }

  handleQuestion(e) {
    this.setState({
      content: e.target.getContent()
    })
  }

}
