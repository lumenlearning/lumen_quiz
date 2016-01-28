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
        debugger;
    tinymce.EditorManager.get('react-tinymce-0').setContent(nextProps.content)
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
      <div id='tinymice'>
        <TinyMCE
          content={this.state.content}
          config={{
            plugins: 'link image lists preview table autoresize media preview',
            toolbar: ' bold italic | image media link | table | preview',
            menubar: false,
            media_live_embeds: true,
            selector: 'div#tinymice'
          }}
          onChange ={(e) => this.handleQuestion(e)}
          onBlur ={(e) => this.handleQuestion(e)}  
          className="form-control" 
        />
      </div>
    )
  }

  handleQuestion(e) {
    debugger;
    this.setState({
      content: e.target.getContent()
    })
  }

}
