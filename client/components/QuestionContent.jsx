import React from 'react';
import Rebase from 're-base';
import TinyMCEInput from 'react-tinymce-input';

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
      <div id='tinymice'>
        <TinyMCEInput
          value={this.state.content}
          tinymceConfig={{
            plugins: 'link image lists preview table autoresize media preview',
            toolbar: ' bold italic | fontsizeselect | image media link | table | preview',
            menubar: false,
            media_live_embeds: true,
            selector: 'div#tinymice',
            body_class: 'custom_tinymce',
            fontsize_formats: '10pt 12pt 14pt 18pt 24pt 36pt'
          }}
          onChange ={(text) => this.handleQuestion(text)}
          className="form-control" 
        />
      </div>
    )
  }

  handleQuestion(text) {
    this.setState({
      content: text
    })
  }

}
