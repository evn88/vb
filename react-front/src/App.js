import "./App.scss";
import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import Table from './components/Table';
import Json from './components/Json';
import InputForm from "./components/InputForm";
import Clock from "./components/Clock";
import Paginate from "./components/Paginate";

library.add(fas)

const appName = "Search comments";
class App extends React.Component {

  state = {

  };

  handleSearch = (search) => {
    console.log(search);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>{appName}</h1>
          <InputForm onSearch={this.handleSearch} />
          <Paginate />
          <Table />
          <Json />
          <Paginate />
          <Clock />
        </header>
      </div>
    );
  }
}

export default App;
