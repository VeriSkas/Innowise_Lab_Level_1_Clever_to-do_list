import { Link } from 'react-router-dom';

import classes from './Todo.module.scss';

export const Todo = (props) => {
  const optionType = props.completed ? classes.Done : '';
  const optionCls = [classes.Option, optionType];
  const deleteCls = [classes.Option, classes.Done].join(' ');

  return (
    <div className={[classes.Todo, classes[props.theme]].join(' ')}>
      <div>
        <div>
          <div
            className={optionCls.join(' ')}
            onClick={() => props.changeTodoStatus(props.id)}
          >
            &#10004;
          </div>
        </div>

        <Link to={`to-do/${props.id}`}>
          <p className={classes.Value}>{props.value}</p>
        </Link>
        <div>
          <div className={deleteCls} onClick={() => props.deleteTodo(props.id)}>
            &#10006;
          </div>
        </div>
      </div>
    </div>
  );
};
