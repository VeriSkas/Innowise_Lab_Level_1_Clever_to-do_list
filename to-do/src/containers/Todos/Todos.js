import { Component } from 'react';

import { Todo } from '../../components/Todo/Todo';
import classes from './Todos.module.scss';

export class Todos extends Component {
  constructor(props) {
    super(props);
  }

  renderTodo() {
    const todos = this.props.todos;

    if (todos) {
      return todos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            id={todo.id}
            value={todo.value}
            completed={todo.completed}
            changeTodoStatus={(id) => this.props.changeTodoStatus(id)}
          />
        );
      });
    }
  }

  render() {
    return (
      <div className={classes.Todos}>
        <div>
          <h3>Todos</h3>
          {this.renderTodo()}
        </div>
      </div>
    );
  }
}
