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
            theme={this.props.theme}
            value={todo.text}
            completed={todo.completed}
            changeTodoStatus={(id) => this.props.changeTodoStatus(id)}
            deleteTodo={(id) => this.props.deleteTodo(id)}
          />
        );
      });
    }
  }

  render() {
    return (
      <div className={[classes.Todos, classes[this.props.theme]].join(' ')}>
        <div>
          <h3>Todos</h3>
          <div className={classes.TodosMain}>{this.renderTodo()}</div>
        </div>
      </div>
    );
  }
}
