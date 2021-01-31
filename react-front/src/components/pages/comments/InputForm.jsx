import "./InputForm.scss";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Export } from "../../Export";

class InputForm extends React.Component {
  state = {
    inputText: "",
  };

  handleInputSearch = ({ target: { value } }) => {
    this.setState({
      inputText: value,
    });
    this.props.onSearch(value);
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

        <button className="btn btn-search" onClick={this.handleSearch} disabled>
          <FontAwesomeIcon icon="search" />
        </button>

        <div className="btn-group">
          <button className="btn" onClick={this.handleFormatToTable}>TABLE</button>
          <button className="btn" onClick={this.handleFormatToJson}>JSON</button>
        </div>
        <div className="btn-group-export">
          <Export name="Export" />
        </div>
      </form>
    );
  }
}

export default InputForm;
