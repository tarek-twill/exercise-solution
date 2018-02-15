import React from 'react';
import ReactDOM from 'react-dom';

require('./modal.css')
/**
 * This exercise will try to teach us how to handle communication in reverse order =>
 * from child element, to parent element.
 *
 * I've prepared simple Modal component which should be opened when button is pressed.
 * Inside modal, there's a button, which being pressed, should close modal.
 *
 * There's also css file called modal.css which can be imported directly to component js file.
 * We will try that, when your Container will be able to open modal.
 *
 * What is missing here?
 * We need to add proper callbacks to handle state changes.
 * Modal should be rendered only if proper state in parent component is set.
 *
 * Hints:
 * Modal accepts callback, which should be triggered when proper button is clicked.
 * That callback should be able to change state of parent element, which will hide modal.
 *
 * Remember that you can use JavaScript expressions (if, else).
 * Element will be rendered when expression is returning true, it's worth to think about that.
 * Maybe it's worth to use modal variable in Container's render function?
 *
 * Extra task:
 *
 * #1
 *
 * Try to pass additional content to Modal component. Remember that you can use this.props.children to render
 * children elements.
 *
 */

// start here

class Modal extends React.Component {
  constructor(props){
    super(props)
    this.state = { test: 'I am from modal component'}
  }
  handleClick(){
    this.props.handleClose()
  }

  render() {
    return (
      <div className="modal">
        <div className="modal-body">
          <h1>I am the modal!</h1>
          <button onClick={() => this.handleClick()}>Close me please :)</button>
          {this.props.children}
          {this.state.test}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  handleClose: React.PropTypes.func
};

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpened: false,
      text: 'Text from container state'
    };
  }

  handleOpen() {
    this.setState({modalOpened: true})
  }
  handleClose() {
    this.setState({modalOpened: false})
  }

  render() {
    // should we always render modal? maybe some conditional statement?
    const modal = this.state.modalOpened ? <Modal handleClose={() => this.handleClose()}> This is a component child {this.state.text} </Modal> : null;

    return (
      <div>
        <button onClick={() => this.handleOpen()} > Open modal </button>
        {modal}
      </div>
    )
  }
}

ReactDOM.render(
  <Container />,
  document.getElementById('app')
);
