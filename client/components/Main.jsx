import React from 'react';
import Rebase from 're-base';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import FlatButton from 'material-ui/lib/flat-button';

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');


export default class Main extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      quizName: '',
    }
  }

  componentWillMount(){
    this.fetchState(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.fetchState(nextProps);
  }

  fetchState(props) {
    base.fetch(`${props.params.quiz_id}/name`, {
      context: this,
      state: 'name',
      then(data){
        this.setState({
          quizName: data
        })
      }
    });
  }


  render () {
    var titleName;
    titleName = "";
    if (this.state.quizName !== null) {
      titleName = this.state.quizName;
    } else {
      titleName = "Quiz Builder";
    }

    var toolbarRender;
    if (this.state.quizName !== null) {
      toolbarRender = (
      <Toolbar className="bar-top">
        <ToolbarGroup float="left">
          <ToolbarTitle className="top-color" text={titleName} />
        <ToolbarSeparator />
        <ToolbarTitle className="top-color-secondary" text="Create Question" />
        </ToolbarGroup>
        <ToolbarGroup float="right">
          <FlatButton 
            className="top-button" 
            label="Save & Preview Quiz" 
            default={true} 
            onClick={() => this.previewQuiz()}
          />
        </ToolbarGroup>
      </Toolbar>
      )
    } else {
      toolbarRender = (
      <Toolbar className="bar-top">
        <ToolbarTitle className="top-color" text={titleName} />
      </Toolbar>
      )
    }

    return (
      <div className="main-container">
        {toolbarRender}
        <div className="container">
          {this.props.children}
        </div>
      </div> 
    )
  }

  previewQuiz() {
    const quizID = this.props.params.quiz_id
    this.props.history.pushState(null, '/quizzes/' + quizID + '/preview')
  }
}