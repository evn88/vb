import "./App.scss";
import React from "react";
import List from "./components/List";
import InputForm from "./components/InputForm";
import Clock from "./components/Clock";

const appName = "Search comments";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  state = {
    todos: [
      { id: 1, checked: false, name: "Сделать зарядку" },
      { id: 2, checked: false, name: "Приготовить обед" },
      { id: 3, checked: false, name: "Поработать" },
    ],
  };

  handleAddTodo(value) {
    let nextId = this.state.todos.length + 1;
    this.setState({
      todos: [{ id: nextId, name: value, status: false }, ...this.state.todos],
    });
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.checked = !todo.checked;
        }
        return todo;
      }),
    });
  }

  render() {
    const { todos } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>{appName}</h1>
          <InputForm todos={todos} onAddTodo={this.handleAddTodo} />
          <List todos={todos} toggleTodo={this.toggleTodo} />
          <Clock />
        </header>
      </div>
    );
  }
}

export default App;
