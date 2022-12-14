import { Component } from 'react';
import { DateItem } from '../../components/DateItem/DateItem';
import { filterTodosByDate } from '../../shared/filterTodos';
import { calendarArray } from '../../shared/mockData';
import classes from './Calendar.module.scss';

export class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: calendarArray(),
      activeDate: new Date(),
    };
  }

  clickDateHandler(date) {
    this.setState((state) => ({
      activeDate: (state.activeDate = new Date(date)),
    }));

    this.props.onClick(date);
  }

  renderDateItems() {
    return this.state.calendar.map((date) => {
      const todayDateString = new Date().toLocaleDateString();
      const dayFromCalendarString = new Date(date).toLocaleDateString();
      const activeDateString = this.state.activeDate.toLocaleDateString();
      const todosOnDate = filterTodosByDate(this.props.todos, date);
      const dateItemProps = {
        key: date,
        date: date,
        todos: todosOnDate.length ? todosOnDate : null,
        active: '',
      };

      if (activeDateString === dayFromCalendarString) {
        dateItemProps.active = 'Active';
      }

      if (todayDateString === dayFromCalendarString) {
        dateItemProps.today = 'Today';
      }

      return (
        <DateItem
          onChangeDate={() => this.clickDateHandler(date)}
          {...dateItemProps}
        />
      );
    });
  }

  render() {
    return (
      <div className={classes.Calendar}>
        <div>{this.renderDateItems()}</div>
      </div>
    );
  }
}
