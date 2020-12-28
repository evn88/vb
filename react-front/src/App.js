import "./App.scss";
import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Table from './components/Table';
import Json from './components/Json';
import InputForm from "./components/InputForm";
import Clock from "./components/Clock";


library.add(fas)

const appName = "Search comments";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormat = this.handleFormat.bind(this);
    this.state = {
      error: null,
      comments: [],
      format: 'table',
      isLoaded: false
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:3001/api/v1/').then(response => {
      return response.json();
    }).then((data) => {
      this.setState({
        comments: data,
        isLoaded: true
      });

      console.log(data);
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
      console.log(error);
    });
  }

  handleSearch = (search) => {
    console.log(search);
  }

  handleFormat(format) {
    this.setState({ format: format });
    console.log(format);
  }


  render() {

    const { error, isLoaded , comments, format } = this.state;
    let list;
    if (error) {
      list = <div className="error">Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      list = <div><FontAwesomeIcon icon="spinner" spin /></div>
    } else if (format === 'table') {
      list = <Table comments={comments} />
    } else {
      list = <Json comments={ comments } />
      console.log(format)
    }


    return (
      <div className="App">
        <header className="App-header">
          <h1>{appName}</h1>
          <InputForm onSearch={this.handleSearch} onFormat={this.handleFormat}  format={format}/>
          {list}
          <Clock />
        </header>
      </div>
    );
  }
}

export default App;
