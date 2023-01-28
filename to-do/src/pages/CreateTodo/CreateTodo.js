import { Component } from 'react';
import { Link } from 'react-router-dom';

import { makeDateToInputFormat, validateControl } from '@validation/validation';
import { Input } from '@components/UI/Input/Input';
import { Button } from '@components/UI/Button/Button';
import classes from './CreateTodo.module.scss';
import { localStorageHandler } from '@utils/localStorage';
import { createTodo } from '@queries/apiHandlers/DatabaseHandler';
import { PATH } from '@constants/paths';
import {
  InputType,
  LabelText,
  ErrorMessageText,
  ButtonText,
  ButtonType,
  TextTitle,
} from '@constants/text';

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
          type: InputType.date,
          label: LabelText.date,
          readOnly: true,
          errorMessage: ErrorMessageText.date,
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        text: {
          value: '',
          type: InputType.text,
          label: LabelText.task,
          errorMessage: ErrorMessageText.task,
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
        <h3>{TextTitle.createTask}</h3>
        <form onSubmit={this.submitHandler} className={classes.CreateTodoForm}>
          {this.renderInputs()}
          <Button
            type={ButtonType.success}
            onClick={this.createTodoHandler}
            disabled={!this.state.isFormValid}
          >
            {ButtonText.createTask}
          </Button>
          <Link to={PATH.home}>
            <Button>{ButtonText.return}</Button>
          </Link>
        </form>
      </div>
    );
  }
}
