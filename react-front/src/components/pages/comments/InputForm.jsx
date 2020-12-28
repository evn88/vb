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
  };

  handleFormatToTable = (e)=> {
    e.preventDefault();
    this.props.onFormat('table');
  }

  handleFormatToJson = (e)=> {
    e.preventDefault();
    this.props.onFormat('json');
  }

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
          <button className="btn btn-default" onClick={this.handleFormatToTable}>TABLE</button>
          <button className="btn btn-default" onClick={this.handleFormatToJson}>JSON</button>
        </div>
      </form>
    );
  }
}

export default InputForm;
