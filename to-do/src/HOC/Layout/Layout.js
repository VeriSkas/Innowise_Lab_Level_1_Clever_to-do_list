import { Component } from 'react';

import { logOut } from '../../api/apiHandlers/AuthHandler';
import { Button } from '../../components/UI/Button/Button';
import classes from './Layout.module.scss';

export class Layout extends Component {
  logOutHandler = () => {
    logOut();
  };

  render() {
    return (
      <div className={classes.Layout}>
        {this.props.isLoggedIn ? (
          <header>
            <div className={classes.HeaderLogo}>
              <div className={classes.Logo}></div>
              <h1>Calendar</h1>
            </div>
            <div>
              <Button onClick={this.logOutHandler}>Log out</Button>
            </div>
          </header>
        ) : null}
        <main>{this.props.children}</main>
      </div>
    );
  }
}
