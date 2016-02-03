import React from 'react';
import Divider from 'material-ui/lib/divider';
import Paper from 'material-ui/lib/paper';
import Checkbox from 'material-ui/lib/svg-icons/navigation/check';
import TinyMCEInput from 'react-tinymce-input';
import Rebase from 're-base';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

const styles = {
  paper: {
    padding: '15px',
    margin: '10px'
  },
  checkbox: {
    width:'1.6rem', 
    height:'1.6rem'
  }
}

export default class PreviewAnswer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.content
    }
  }

  renderCheckbox() {
    if (this.props.correct) {return <Checkbox style={styles.checkbox} color={'#4bbf6b'} />}
  }

  componentDidMount() {
    this.ref = base.syncState(`${this.props.quiz_id}/questions/${this.props.question_id}/answers/${this.props.answer_id}/content`, {
      context: this,
      state: 'content',
      asArray: false
    });
    let selector = '#answer-' + this.props.question_id + '-' + this.props.id
    tinymce.init({
      selector: selector,
      inline: true,
      toolbar: 'undo redo save',
      menubar: false,
      plugins: 'save',
      save_onsavecallback: (obj) => this.editAnswerInline(obj.targetElm.innerText)
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {
    return (
      <Paper zDepth={1} style={styles.paper} className='preview-answer-wrapper'>
        <span className='preview-answer-num'>{this.props.id}.</span>
        <div id={'answer-' + this.props.question_id + '-' + this.props.id} className='preview-answer-content'>{this.props.content}</div>
        <span className='preview-answer-checkbox'>{this.renderCheckbox()}</span>
      </Paper>
    )
  }

  editAnswerInline(obj) {
    this.setState({content:obj})
    this.props.openSnackbar();
  }
}