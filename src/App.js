import React from "react"
import "./App.css"

class App extends React.Component {
  state = {
    value: "",
    display: "all",
    todos: [
      {
        id: 0,
        text: "Do coding challenges",
        completed: false,
      },
      {
        id: 1,
        text: "Do more coding challenges",
        completed: false,
      },
      {
        id: 2,
        text: "Carry on doing coding challenges",
        completed: false,
      },
    ],
    displayedTodos: [],
  }

  componentDidMount() {
    this.setState({ displayedTodos: [...this.state.todos] })
  }

  handleSubmit = e => {
    e.preventDefault()
    const updatedTodos = [...this.state.todos]
    if (this.state.value.length > 0) {
      updatedTodos.push({
        id: e.timeStamp,
        text: this.state.value.trim(),
        completed: false,
      })
    }
    this.setState({ value: "", todos: updatedTodos })
    if (this.state.display === "all") {
      this.setState({ displayedTodos: [...updatedTodos] })
    } else if (this.state.display === "active") {
      const activeTodos = [...updatedTodos].filter(todo => !todo.completed)
      this.setState({ display: "active", displayedTodos: activeTodos })
    } else if (this.state.display === "completed") {
      const completedTodos = [...updatedTodos].filter(todo => todo.completed)
      this.setState({ display: "active", displayedTodos: completedTodos })
    }
  }

  handleInputChange = e => {
    this.setState({ value: e.target.value })
  }

  handleCheckChange = todo => {
    const todoIndex = this.state.todos.indexOf(todo)
    const newTodos = [...this.state.todos]
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed
    this.setState({ todos: newTodos })
    if (this.state.display === "all") {
      this.setState({ displayedTodos: [...newTodos] })
    } else if (this.state.display === "active") {
      const activeTodos = [...newTodos].filter(todo => !todo.completed)
      this.setState({ displayedTodos: activeTodos })
    } else if (this.state.display === "completed") {
      const completedTodos = [...newTodos].filter(todo => todo.completed)
      this.setState({ displayedTodos: completedTodos })
    }
  }

  displayAll = () => {
    this.setState({ display: "all", displayedTodos: [...this.state.todos] })
  }
  displayActive = () => {
    const activeTodos = [...this.state.todos].filter(todo => !todo.completed)
    this.setState({ display: "active", displayedTodos: activeTodos })
  }
  displayCompleted = () => {
    const completedTodos = [...this.state.todos].filter(todo => todo.completed)
    this.setState({ display: "completed", displayedTodos: completedTodos })
  }
  deleteTodo = todo => {
    let newTodos = [...this.state.todos].filter(item => item !== todo)
    const newDisplayedTodos = [...newTodos].filter(todo => todo.completed)
    this.setState({ todos: newTodos, displayedTodos: newDisplayedTodos })
  }
  deleteAllCompleted = () => {
    const activeTodos = [...this.state.todos].filter(todo => !todo.completed)
    this.setState({ todos: activeTodos, displayedTodos: [] })
  }

  render() {
    return (
      <div className="todo-app">
        <h1>#todo</h1>

        <div className="menu">
          <button
            onClick={this.displayAll}
            className={this.state.display === "all" ? "highlighted" : ""}
          >
            All
          </button>
          <button
            onClick={this.displayActive}
            className={this.state.display === "active" ? "highlighted" : ""}
          >
            Active
          </button>
          <button
            onClick={this.displayCompleted}
            className={this.state.display === "completed" ? "highlighted" : ""}
          >
            Completed
          </button>
        </div>

        <form
          onSubmit={this.handleSubmit}
          className={this.state.display === "completed" ? "hidden" : ""}
        >
          <input
            type="text"
            placeholder="add details"
            value={this.state.value}
            onChange={this.handleInputChange}
          />
          <input type="submit" value="Add" />
        </form>

        <div className="todo-list">
          {this.state.displayedTodos.map(todo => (
            <div className="todo-item" key={todo.id}>
              <label className={todo.completed ? "completed" : ""}>
                {todo.text}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => this.handleCheckChange(todo)}
                />
                <span class="checkmark"></span>
              </label>
              <button
                className={this.state.display === "completed" ? "trash" : "trash hidden"}
                onClick={() => this.deleteTodo(todo)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="22px" height="22px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              </button>
            </div>
          ))}
        </div>

        <button
          className={
            this.state.display === "completed" && this.state.displayedTodos.length > 0
              ? "delete-all"
              : "delete-all hidden"
          }
          onClick={this.deleteAllCompleted}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          delete all
        </button>
      </div>
    )
  }
}

export default App
