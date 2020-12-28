import "./InputForm.scss";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class InputForm extends React.Component {
  state = {
    inputText: "",
  };

  handleInputSearch = ({ target: { value } }) => {
    this.setState({
      inputText: value,
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({ inputText: "" });
    this.props.onSearch(this.state.inputText);
    // console.log(this.state.inputText);
  };

  render() {
    const { inputText } = this.state;
    return (
      <form className="inputForm">
        <input
          type="text"
          name="searchInput"
          placeholder="Search"
          value={inputText}
          onChange={this.handleInputSearch}
          autoFocus
        />

        <button className="btn btn-search" onClick={this.handleSearch}>
          <FontAwesomeIcon icon="search" />
        </button>

        <div className="btn-group">
          <button className="btn btn-default">JSON</button>
          <button className="btn btn-default">TABLE</button>
        </div>
      </form>
    );
  }
}

export default InputForm;
