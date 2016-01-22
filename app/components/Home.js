import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
        <div className="container">
        <h2>Quiz Title</h2>
          <fieldset>
            <label htmlFor='title'></label>
            <input type='text' id='title' />
            <br />
            <button bsStyle="primary" onClick={this.handleClick}>ADD QUESTION</button>
          </fieldset>
          </div>
    )
  }

  handleClick() {
    this.props.history.pushState(null, "/quiz")
  }
}
