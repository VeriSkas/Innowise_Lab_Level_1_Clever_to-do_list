import { weekDays } from '../../shared/dateInformation';
import classes from './DateItem.module.scss';

export const DateItem = (props) => {
  const itemClass = [classes.Item, classes[props.active], classes[props.today]];
  const date = new Date(props.date);
  const weekday = weekDays[date.getDay()];

  const renderTodosOptions = (todos) => {
    if (todos) {
      return todos.map((todo) => {
        const cls = todo.completed
          ? [classes.Option, classes.Completed]
          : [classes.Option];

        return <div key={todo.id} className={cls.join(' ')}></div>;
      });
    }
  };

  const activeDateHandler = () => {
    props.onChangeDate(date);
  };

  return (
    <div className={[classes.DateItem, classes[props.theme]].join(' ')}>
      <div className={itemClass.join(' ')} onClick={() => activeDateHandler()}>
        <span className={classes.Weekday}>{weekday}</span>
        <span className={classes.Day}>{date.getDate()}</span>
      </div>
      <div className={classes.ItemOptions}>
        {renderTodosOptions(props.todos)}
      </div>
    </div>
  );
};
