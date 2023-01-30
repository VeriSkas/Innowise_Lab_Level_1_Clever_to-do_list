import { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { Todo } from '@components/Todo/Todo';
import classes from './Todos.module.scss';
import { TextTitle } from '@constants/text';

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
    const { t } = this.props;

    return (
      <div className={`${classes.Todos} ${classes[this.props.theme]}`}>
        <div>
          <h3>{t(TextTitle.todos)}</h3>
          <div className={classes.TodosMain}>{this.renderTodo()}</div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Todos);
