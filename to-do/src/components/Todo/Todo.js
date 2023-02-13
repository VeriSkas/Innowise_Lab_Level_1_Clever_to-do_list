import { Link } from 'react-router-dom';

import { PATH } from '@constants/paths';
import classes from './Todo.module.scss';

export const Todo = (props) => {
  const optionType = props.completed ? classes.Done : '';

  const changeTodo = () => {
    props.changeTodoStatus(props.id);
  };

  const deleteTodo = () => {
    props.deleteTodo(props.id);
  };

  return (
    <div className={`${classes.Todo} ${classes[props.theme]}`}>
      <div>
        <div>
          <div
            className={`${classes.Option} ${optionType}`}
            onClick={changeTodo}
          >
            &#10004;
          </div>
        </div>

        <Link to={`${PATH.todos}/${props.id}`}>
          <p className={classes.Value}>{props.value}</p>
        </Link>
        <div>
          <div
            className={`${classes.Option} ${classes.Done}`}
            onClick={deleteTodo}
          >
            &#10006;
          </div>
        </div>
      </div>
    </div>
  );
};
