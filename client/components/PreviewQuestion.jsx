import React from 'react';
import PreviewAnswer from './PreviewAnswer.jsx'
import AppBar from 'material-ui/lib/app-bar';
import ExpandMore from 'material-ui/lib/svg-icons/navigation/expand-more';
import ExpandLess from 'material-ui/lib/svg-icons/navigation/expand-less';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import EditIcon from 'material-ui/lib/svg-icons/image/edit';
import Delete from 'material-ui/lib/svg-icons/navigation/cancel';
import Rebase from 're-base';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

const styles = {
  expand: {
    cursor:'pointer', 
    position:'absolute', 
    top:'15px', 
    right:'20px', 
    width:'2rem', 
    height:'2rem'
  },
  appBar: {
    backgroundColor: '#fff',
    position: 'relative',
    marginBottom: '10px'
  },
  paper: {
    padding: '15px',
    margin: '10px',
  },
  editButtonIcon: {
    backgroundColor:'#4bbf6b',
    padding: '5.5px',
    borderRadius: '100%',
    width: '1rem',
    height: '1rem',
    margin: '2.5px',
    cursor: 'pointer'
  },
  deleteButtonIcon: {
    width: '2rem',
    height: '2rem',
    cursor: 'pointer'
  }
}

export default class PreviewQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answersOpen: false
    }
  }

  parseHTMLContent() { 
    let html = {__html: this.props.content}; 
    return <div className="question-preview-content" dangerouslySetInnerHTML={html} />
  }

  renderAnswers() {
    let allAnswers = []
    let answers = this.props.answers
    for (var key in answers) {
      var answerNum = allAnswers.length + 1
      allAnswers.push(
        <PreviewAnswer 
        key = {answers[key].key}
        id = {answerNum}
        content = {answers[key].content}
        correct = {answers[key].correct}
        />
      )
    } 
    return allAnswers
  }

  renderExpand() {
    if (this.state.answersOpen) {
      return  (<IconButton style={styles.expand} color='#333' onClick={() => this.toggleAnswers()}><ExpandLess /></IconButton>)
    } else {
      return  (<IconButton style={styles.expand} color='#333' onClick={() => this.toggleAnswers()}><ExpandMore /></IconButton>)
    }
  }

  render() {
    return (
      <div>
        <Paper zDepth={2} style={styles.appBar}>
          <div className="question-preview-wrapper">
            <div className="edit-buttons">
              <EditIcon 
                style={styles.editButtonIcon}
                color='#fff' 
                onClick={() => this.editQuestion()}
              />
              <Delete 
                className = "btn1" 
                onClick = {() => this.deleteQuestion()}
                color = {'#c83637'}
                style = {styles.deleteButtonIcon}
              />
            </div>
            {this.parseHTMLContent()}
            {this.renderExpand()}
          </div>
        </Paper>
        <div>
          {this.state.answersOpen ? this.renderAnswers() : null}
        </div>
      </div>
    )
  }

  deleteQuestion() {
    if (confirm("Are you sure you want to delete this question?")) {
      this.props.deleteQuestion(this.props.id);  
    }
  }

  editQuestion() {
    const quizID = this.props.quiz_id
    const questionID = this.props.id
    this.props.history.pushState(null, "/quizzes/" + quizID + '/questions/' + questionID)
  }

  toggleAnswers() {
    this.state.answersOpen ? this.setState({answersOpen: false}) : this.setState({answersOpen: true})
  }
}