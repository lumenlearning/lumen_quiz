import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.scss'

export default class App extends React.Component {
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

ReactDOM.render(
  <App />,
  document.getElementById('app')
)