import React from 'react';
import Rebase from 're-base';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import RaisedButton from 'material-ui/lib/raised-button';

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


    return (
      <div className="main-container">
        <Toolbar className="bar-top">
          <ToolbarTitle text={titleName} />
       </Toolbar>

        <div className="container">
          {this.props.children}
        </div>
      </div>

      
    )
  }
}
