import classes from './DateItem.module.scss';

const props = {
  active: 'Active',
  today: 'Today',
  date: {
    weekday: 'Sun',
    day: 10,
  },
  todos: [
    {
      id: 1,
      completed: true,
    },
    {
      id: 2,
      completed: true,
    },
    {
      id: 3,
      completed: false,
    },
  ],
};

export const DateItem = () => {
  const itemClass = [classes.Item, classes[props.active], classes[props.today]];
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

  return (
    <div className={classes.DateItem}>
      <div className={itemClass.join(' ')}>
        <span className={classes.Weekday}>{props.date.weekday}</span>
        <span className={classes.Day}>{props.date.day}</span>
      </div>
      <div className={classes.ItemOptions}>
        {renderTodosOptions(props.todos)}
      </div>
    </div>
  );
};
