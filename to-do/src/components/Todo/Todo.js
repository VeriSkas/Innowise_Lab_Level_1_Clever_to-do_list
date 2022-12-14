import { Link } from 'react-router-dom';

import classes from './Todo.module.scss';

export const Todo = (props) => {
  const optionType = props.completed ? classes.Done : '';
  const optionCls = [classes.Option, optionType];

  return (
    <div className={classes.Todo}>
      <div>
        <div
          className={optionCls.join(' ')}
          onClick={() => props.changeTodoStatus(props.id)}
        >
          &#10004;
        </div>

        <Link to={`${props.id}`}>
          <p className={classes.Value}>{props.value}</p>
        </Link>
      </div>
    </div>
  );
};
