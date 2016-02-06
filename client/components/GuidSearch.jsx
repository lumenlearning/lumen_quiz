import React from 'react';
import Rebase from 're-base';
import Outcomes from '../../outcomes.json';
var Typeahead = require('react-typeahead').Typeahead;

const base = Rebase.createClass('https://lumenquiz.firebaseio.com/');

export default class GuidSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guid: '',
      searchOpen: false,
      closeBtn: false
    }
  }

  componentDidMount(){
    this.ref = base.syncState(`${this.props.quiz_id}/questions/${this.props.question_id}/guid`, {
      context: this,
      state: 'guid',
      asArray: false
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.question_id !== nextProps.question_id) {
      base.removeBinding(this.ref);
      this.ref = base.syncState(`${this.props.quiz_id}/questions/${this.props.question_id}/guid`, {
        context: this,
        state: 'guid',
        asArray: false
      });
    }
  }

  placeholder() {
    return this.state.guid.short_title ? `Learning Outcome: ${this.state.guid.short_title}` : 'Click to Add Learning Outcome'
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {
    return (
      <div className="typeahead-wrapper">
        <Typeahead
          options = {Outcomes}
          maxVisible = {10}
          filterOption = 'short_title'
          displayOption = 'short_title'
          onOptionSelected = {(obj) => this.saveGuid(obj)}
          placeholder = {this.placeholder()}
          ref={'typeahead'}
          customClasses={{
            typeahead: "topcoat-list",
            input: "topcoat-text-input",
            results: "topcoat-list_container",
            listItem: "topcoat-list_item",
            token: "topcoat-button",
            customAdd: "topcoat-addme"
          }}
          onKeyUp = {() => this.closeBtn()}
        /> 
        {this.renderCloseBtn()}
        <br />
      </div>
    )
  }

  closeDropdown() {
    this.refs.typeahead.setState({
      entryValue: '',
      selection: null,
      visible: []
    })
    this.setState({
      closeBtn: false
    })
  }

  closeBtn() {
    if (this.refs.typeahead.state.entryValue === '') {
      this.setState({
        closeBtn: false
      })
    } else {
      this.setState({
        closeBtn: true
      })
    }
  }

  renderCloseBtn() {
    if (this.state.closeBtn) {
      return <div className="typeahead-btn"><div onClick={() => this.closeDropdown()}>x</div></div>
    }
  }

  saveGuid(obj) {
    this.setState({
      guid: obj,
      closeBtn: false
    })
  }
}