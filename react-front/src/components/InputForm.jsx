import "./InputForm.scss";
import React from "react";

class InputForm extends React.Component {
  state = {
    inputText: "",
  };

  handleInputTodo = ({ target: { value } }) => {
    this.setState({
      inputText: value,
    });
  };

  handleAddTodo = (e) => {
    e.preventDefault();
    this.setState({ inputText: "" });
    this.props.onAddTodo(this.state.inputText);
    console.log(this.state.inputText);
  };

  render() {
    const { inputText } = this.state;
    return (
      <form className="inputForm">
        <input
          type="text"
          name="todoInput"
          placeholder="Enter item"
          value={inputText}
          onChange={this.handleInputTodo}
          autoFocus
        />
        <button onClick={this.handleAddTodo}>⏎</button>
      </form>
    );
  }
}

export default InputForm;
