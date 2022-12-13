import { Component } from 'react';
import { DateItem } from '../../components/DateItem/DateItem';
import classes from './Calendar.module.scss';

export class Calendar extends Component {
  render() {
    return (
      <div className={classes.Calendar}>
        <div>
          <DateItem />
          <DateItem />
          <DateItem />
          <DateItem />
          <DateItem />
          <DateItem />
          <DateItem />
          <DateItem />
          <DateItem />
          <DateItem />
          <DateItem />
          <DateItem />
          <DateItem />
          <DateItem />
          <DateItem />
          <DateItem />
          <DateItem />
          <DateItem />
          <DateItem />
          <DateItem />
          <DateItem />
        </div>
      </div>
    );
  }
}
