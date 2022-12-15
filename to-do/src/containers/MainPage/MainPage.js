import { Component } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../components/UI/Button/Button';
import { filterTodosByDate } from '../../shared/filterTodos';
import { MockTodos } from '../../shared/mockData';
import { Calendar } from '../Calendar/Calendar';
import { Todos } from '../Todos/Todos';
import classes from './MainPage.module.scss';

export class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todosOnDate: [],
      todayDate: new Date(),
      activeDate: new Date(),
    };
  }

  componentDidMount() {
    Promise.resolve()
      .then(() => {
        this.setState((state) => ({
          todos: (state.todos = MockTodos.todos),
        }));
      })
      .then(() => this.changeTodosAfterDate(this.state.todayDate));
  }

  changeTodosAfterDate = (date) => {
    const todos = [...this.state.todos];
    const todosOnDate = filterTodosByDate(todos, date);

    this.setState((state) => ({
      todosOnDate: (state.todosOnDate = todosOnDate),
      activeDate: (state.activeDate = date),
    }));
  };

  changeTodoStatus = (id) => {
    const todos = [...this.state.todos];
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }

      return todo;
    });

    this.setState((state) => ({
      todos: (state.todos = updatedTodos),
    }));
  };

  deleteTodo = (id) => {
    const todos = [...this.state.todos];
    const todosOnDate = [...this.state.todosOnDate];
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    const updatedTodosOnDate = todosOnDate.filter((todo) => todo.id !== id);

    this.setState((state) => ({
      todos: (state.todos = updatedTodos),
      todosOnDate: (state.updatedTodosOnDate = updatedTodosOnDate),
    }));
  };

  render() {
    const activeDateMs = +new Date(this.state.activeDate);

    return (
      <div className={classes.MainPage}>
        <Calendar
          todos={[...this.state.todos]}
          onClick={(date) => this.changeTodosAfterDate(date)}
        />
        <Todos
          todos={this.state.todosOnDate}
          changeTodoStatus={(id) => this.changeTodoStatus(id)}
          deleteTodo={(id) => this.deleteTodo(id)}
        />
        <Link to={`/to-do-create/${activeDateMs}`}>
          <Button> &#10010; Add New Task</Button>
        </Link>
      </div>
    );
  }
}
