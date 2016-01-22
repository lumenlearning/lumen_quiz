import React from 'react';

export default class Main extends React.Component {
  render () {
    return (
      <div className="main-container">
        <div className="bar-top">
          <span>Quiz Builder</span>
        </div>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}