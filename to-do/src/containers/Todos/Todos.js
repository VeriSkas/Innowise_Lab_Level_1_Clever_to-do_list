import { Component } from 'react';

import { Todo } from '../../components/Todo/Todo';
import classes from './Todos.module.scss';

export class Todos extends Component {
  render() {
    return (
      <div className={classes.Todos}>
        <div>
          <h3>Todos</h3>
          <Todo value="bla bla bla" />
          <Todo value="bla bla bla" type="Done" />
          <Todo value="bla bla bla" />
        </div>
      </div>
    );
  }
}
