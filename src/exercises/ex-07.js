import React from 'react';
import ReactDOM from 'react-dom';

/**
 * From previous task we've learned how to render list of elements.
 * Why not extending that and allow our users to add and remove elements from the list?
 *
 * In previous exercise, we were rendering elements directly from props, but remember, to modify data
 * we need to work on state. First thing we need to do is to attach our data from properties to state.
 *
 * When creating component, in constructor, we have access to props. That might be helpful to copy
 * our data to state.
 *
 * Now, to render our list we need to use state instead of props, like in previous example.
 *
 * Okay, now let's try remove element from list, which is easier task here.
 * What we need to do to remove element from array?
 * We need to know exact position of element, but we have it, cause map method return that.
 *
 * TRICKY PART NOW, WATCH OUT!
 *
 * To remove elements from array we can use splice method, but, warning here =>
 * splice method mutates original array!
 * This is important, because we shouldn't mutate our data. We still can use splice method,
 * but first we need to create copy of an array. To do that, we can use slice method.
 * When calling slice method on our array, without any arguments, we will get full copy of an array.
 *
 * Knowing about that, let's create some callback function that will allow to update our state with new collection.
 *
 * Next thing is to allow user to add elements to the list.
 * This is also quite tricky.
 *
 * We need to connect few elements that we've did today already.
 *
 * First thing is to add input which will hold name of new element. What is required here? New state property, right!
 * Then we need to add some callback which will trigger method, which will add new element to list - easy!
 *
 * So, create input, handle state change when input changes, then just add button and trigger proper action.
 *
 * What is also important here? Same as previously, in callback which is responsible for adding elements,
 * we will use method which mutates original array. So, remember to create copy first.
 *
 * Everything works? Great!
 *
 * Now.. I think we might do some refactoring here, cause there's a lot of things happening in List component, which
 * was responsible only for displaying list of elements at beginning. Let's try to keep things clear.
 *
 * Remember about Thinking in React way? Look at the list of elements, look at the form
 * below (or above) list. Form seems like candidate that might live on his own, right? Okay, let's try to move him out!
 *
 * First, create new component, Form or something.
 *
 * Now, we should move all dependent methods to Form element with it's state.
 * After that, we need to communicate somehow with Form component and detect, when user pressed the button.
 * Because form is now holding the information about the input state, if we still want to add element on list,
 * we need to know that state. Maybe it's worth to pass that value in callback function?
 *
 * Hint:
 * Watch out who holds the state!
 * Remember that you can communicate with child components using callbacks and properties.
 *
 */

// start here

const reasons = [
  'Applicable under EC261 (or DOT) regulation',
  'No strike',
  'Flight disrupted or missed connection',
  'Airport report showing no disruption',
  'Operating airline checked',
  'Tried to retreive e-ticket',
  'Itinerary confirmed/ legs added (if relevant)',
  'Booking ref. checked (if relevant)/ Correct AF received',
  'All required documents received (if relevant)',
  'Documents named and uploaded',
  'The amount of compensation is correct'
];

class NewElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newText: ''
    }
  }
  handleChange(e) {
    this.setState({ newText: e.target.value})
  }
  handleAdd() {
    this.props.elementAdd(this.state.newText)
    this.setState({newText: ''})
  }
  render() {
    return (
      <div>
        <input value={this.state.newText} type='text' onChange={(e) => this.handleChange(e)} />
        <button onClick={() => this.handleAdd()}>Add</button>
      </div>
    )
  }
}

class List extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: this.props.items

    }
  }
  handleRemove(index) {
    const changeItems = this.state.items.slice()
    changeItems.splice(index, 1)
    this.setState({ items: changeItems })
  }
  handleAdd(itemName) {
    const newArray = this.state.items.slice()
    newArray.push(itemName)
    this.setState({ items: newArray, newText: '' })
  }
  renderList() {
    return this.state.items.map((item, index) => {
       return <li key={index}> {item} <a href='#' onClick={() => this.handleRemove(index)}> Remove </a> </li>
    })
  }

  render() {
    return (
      <div>
        <ol>
          {this.renderList()}
        </ol>
        <NewElement elementAdd={ this.handleAdd.bind(this) }/>
      </div>
    );
  }
}

ReactDOM.render(
  <List items={reasons}/>,
  document.getElementById('app')
);
