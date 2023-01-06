import { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  makeDateToInputFormat,
  validateControl,
} from '../../shared/validation';
import { Input } from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import classes from './CreateTodo.module.scss';
import { localStorageHandler } from '../../shared/localStorage';
import { createTodo } from '../../api/apiHandlers/DatabaseHandler';

export class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: localStorageHandler('getItem', 'uid'),
      isLoggedIn: false,
      isFormValid: false,
      formControls: {
        date: {
          value: '',
          type: 'date',
          label: 'Date',
          readOnly: true,
          errorMessage: 'Enter valid date',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        text: {
          value: '',
          type: 'text',
          label: 'Task',
          errorMessage: 'Enter valid task',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 6,
            maxLength: 100,
          },
        },
      },
    };
  }

  componentDidMount() {
    const todoDateFromURL = +window.location.href.split('/').at(-1);
    this.setState((state) => {
      state.formControls.date.value = makeDateToInputFormat(todoDateFromURL);
      state.formControls.date.valid = true;

      return state;
    });
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    let isFormValid = true;

    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    formControls[controlName] = control;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState((state) => ({
      formControls: (state.formControls = formControls),
      isFormValid: (state.isFormValid = isFormValid),
    }));
  };

  createTodoHandler = () => {
    const todo = Object.keys(this.state.formControls).reduce(
      (acc, controlName) => {
        const control = this.state.formControls[controlName];
        const value =
          controlName === 'date'
            ? new Date(control.value).toJSON()
            : control.value;

        return { ...acc, [controlName]: value };
      },
      {
        completed: false,
        createDate: new Date().toJSON(),
      }
    );

    createTodo(this.state.uid, todo);
  };

  cleanForm = () => {
    this.setState((state) => {
      state.isFormValid = false;
      state.formControls.text.value = '';

      return state;
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.cleanForm();
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, i) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={i}
          theme={this.props.theme}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          readOnly={control.readOnly || false}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    return (
      <div className={classes.CreateTodo}>
        <h3>Create new task</h3>
        <form onSubmit={this.submitHandler} className={classes.CreateTodoForm}>
          {this.renderInputs()}
          <Button
            type="success"
            onClick={this.createTodoHandler}
            disabled={!this.state.isFormValid}
          >
            Create task
          </Button>
          <Link to={'/'}>
            <Button>Return</Button>
          </Link>
        </form>
      </div>
    );
  }
}