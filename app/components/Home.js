import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <button bsStyle="primary" onClick={this.handleClick}>Moo</button>
    )
  }

  handleClick() {
    this.props.history.pushState(null, "/quiz")
  }
}