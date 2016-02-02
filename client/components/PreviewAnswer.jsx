import React from 'react';
import Divider from 'material-ui/lib/divider';
import Paper from 'material-ui/lib/paper';
import Checkbox from 'material-ui/lib/svg-icons/navigation/check';

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
  }

  componentDidMount() {

  }

  renderCheckbox() {
    if (this.props.correct) {return <Checkbox style={styles.checkbox} color={'#4bbf6b'} />}
  }

  render() {
    return (
      <Paper zDepth={1} style={styles.paper} className='preview-answer-wrapper'>
        <span className='preview-answer-num'>{this.props.id}.</span>
        <span className='preview-answer-content'>{this.props.content}</span>
        <span className='preview-answer-checkbox'>{this.renderCheckbox()}</span>
      </Paper>
    )
  }
}