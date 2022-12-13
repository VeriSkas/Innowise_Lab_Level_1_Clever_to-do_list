import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import classes from './Content.module.scss';

export class Content extends Component {
  render() {
    return (
      <div className={classes.Content}>
        <div>
          <h1>Calendar</h1>
          <div className={classes.ContentMain}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
}
