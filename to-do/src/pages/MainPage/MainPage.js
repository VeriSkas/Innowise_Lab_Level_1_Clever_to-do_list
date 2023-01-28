import { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  deleteTodo,
  getTodos,
  updateTodo,
} from '@queries/apiHandlers/DatabaseHandler.js';
import { Button } from '@components/UI/Button/Button';
import { filterTodosByDate } from '@utils/filterTodos';
import { localStorageHandler } from '@utils/localStorage';
import { Calendar } from '../Calendar/Calendar';
import { Todos } from '../Todos/Todos';
import classes from './MainPage.module.scss';
import { PATH } from '@constants/paths';
import { ButtonText } from '@constants/text';

export class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: localStorageHandler('getItem', 'uid'),
      todos: [],
      todosOnDate: [],
      activeDate: new Date(),
    };
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos = async () => {
    await getTodos(this.state.uid)
      .then((todos) => {
        this.setState((state) => ({
          todos: (state.todos = todos),
        }));
        this.props.getTodos(todos);
        return todos;
      })
      .then((todos) => {
        this.changeTodosAfterDate(this.state.activeDate, todos);
      });
  };

  changeTodosAfterDate = (date, todos) => {
    const todosOnDate = filterTodosByDate(todos, date);

    this.setState((state) => ({
      todosOnDate: (state.todosOnDate = todosOnDate),
      activeDate: (state.activeDate = date),
    }));
  };

  changeTodoStatus = (id) => {
    const todos = [...this.state.todos];
    const updatedTodo = todos.find((todo) => todo.id === id);

    updatedTodo.completed = !updatedTodo.completed;
    updateTodo(this.state.uid, updatedTodo).then(() => this.getTodos());
  };

  deleteTodo = (id) => {
    deleteTodo(this.state.uid, id).then(() => this.getTodos());
  };

  render() {
    const activeDateMs = +new Date(this.state.activeDate);

    return (
      <div className={classes.MainPage}>
        <Calendar
          todos={[...this.state.todos]}
          onClick={(date) => this.changeTodosAfterDate(date, this.state.todos)}
          theme={this.props.theme}
        />
        <Todos
          todos={this.state.todosOnDate}
          changeTodoStatus={(id) => this.changeTodoStatus(id)}
          deleteTodo={(id) => this.deleteTodo(id)}
          theme={this.props.theme}
        />
        <Link to={`/${PATH.createTodos}/${activeDateMs}`}>
          <Button> &#10010; {ButtonText.addTask}</Button>
        </Link>
      </div>
    );
  }
}
