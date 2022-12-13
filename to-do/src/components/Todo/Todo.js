import classes from './Todo.module.scss';

export const Todo = (props) => {
  const optionCls = [classes.Option, classes[props.type]]; // classes.Done
  return (
    <div className={classes.Todo}>
      <div>
        <div className={optionCls.join(' ')}>&#10004;</div>
        <p className={classes.Value}>{props.value}</p>
      </div>
    </div>
  );
};
