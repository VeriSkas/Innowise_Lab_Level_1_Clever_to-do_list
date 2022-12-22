import { Component } from 'react';

import { DateItem } from '../../components/DateItem/DateItem';
import { filterTodosByDate } from '../../shared/filterTodos';
import { calendarArray, months } from '../../shared/mockData';
import classes from './Calendar.module.scss';

export class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: calendarArray(new Date().getFullYear(), new Date().getMonth()),
      activeDate: new Date(),
      activeMonth: new Date().getMonth(),
      activeYear: new Date().getFullYear(),
    };
  }

  clickDateHandler(date) {
    this.setState((state) => ({
      activeDate: (state.activeDate = new Date(date)),
    }));

    this.props.onClick(date);
  }

  changeMonth = (direction) => {
    let activeMonth = this.state.activeMonth;
    let activeYear = this.state.activeYear;

    direction === 'after' ? activeMonth++ : activeMonth--;

    if (activeMonth >= months.length) {
      activeMonth = 0;
      activeYear++;
    }

    if (activeMonth < 0) {
      activeMonth = months.length - 1;
      activeYear--;
    }

    this.setState((state) => ({
      calendar: calendarArray(activeYear, activeMonth),
      activeMonth: (state.activeMonth = activeMonth),
      activeYear: (state.activeYear = activeYear),
    }));
  };

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
          theme={this.props.theme}
          {...dateItemProps}
        />
      );
    });
  }

  render() {
    return (
      <div className={[classes.Calendar, classes[this.props.theme]].join(' ')}>
        <div className={classes.Month}>
          <span
            className={classes.LeftArrow}
            onClick={() => this.changeMonth('before')}
          >
            &#10094;
          </span>
          <h3>{`${months[this.state.activeMonth]} ${
            this.state.activeYear
          }`}</h3>
          <span
            className={classes.RightArrow}
            onClick={() => this.changeMonth('after')}
          >
            &#10095;
          </span>
        </div>
        <div className={classes.DateItems}>{this.renderDateItems()}</div>
      </div>
    );
  }
}
