import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/UI/Button/Button';
import { Calendar } from '../Calendar/Calendar';
import { Todos } from '../Todos/Todos';
import classes from './MainPage.module.scss';

export class MainPage extends Component {
  render() {
    return (
      <div className={classes.MainPage}>
        <Calendar />
        <Todos />
        <Link to={'/to-do-create'}>
          <Button> &#10010; Add New Task</Button>
        </Link>
      </div>
    );
  }
}
