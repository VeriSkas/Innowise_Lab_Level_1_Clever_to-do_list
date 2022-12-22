import { Component } from 'react';
import { Link } from 'react-router-dom';

import { getTodo, updateTodo } from '../../api/apiHandlers/DatabaseHandler';
import { Button } from '../../components/UI/Button/Button';
import { Input } from '../../components/UI/Input/Input';
import { localStorageHandler } from '../../shared/localStorage';
import { validateControl } from '../../shared/validation';
import classes from './TodoPage.module.scss';

export class TodoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: localStorageHandler('getItem', 'uid'),
      isLoggedIn: false,
      isFormValid: false,
      formControls: {
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
      todo: {},
    };
  }

  componentDidMount() {
    this.getTodo();
  }

  getTodo = async () => {
    const idTodoInURL = window.location.href.split('/').at(-1);

    await getTodo(this.state.uid, idTodoInURL).then((todo) => {
      this.setState((state) => {
        state.todo = todo;
        state.formControls.text.value = todo.text;

        return state;
      });
    });
  };

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

  changeTodoHandler = () => {
    const todo = { ...this.state.todo };
    const updatedTodo = Object.keys(this.state.formControls).reduce(
      (acc, controlName) => {
        const control = this.state.formControls[controlName];
        const value = control.value;

        return { ...acc, [controlName]: value };
      },
      {
        ...todo,
        createDate: new Date().toJSON(),
      }
    );

    updateTodo(this.state.uid, updatedTodo);
  };

  cleanForm = () => {
    this.setState((state) => {
      state.isFormValid = false;

      return state;
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.cleanForm();
  };

  render() {
    const control = this.state.formControls['text'];

    return (
      <div className={classes.TodoPage}>
        <h3>Change task</h3>
        <form onSubmit={this.submitHandler} className={classes.TodoPageForm}>
          <Input
            theme={this.props.theme}
            type={control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            errorMessage={control.errorMessage}
            shouldValidate={!!control.validation}
            onChange={(event) => this.onChangeHandler(event, 'text')}
          />
          <Button
            type="success"
            onClick={this.changeTodoHandler}
            disabled={!this.state.isFormValid}
          >
            Save changes
          </Button>
          <Link to={'/'}>
            <Button>Return</Button>
          </Link>
        </form>
      </div>
    );
  }
}
