import { Component } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../components/UI/Button/Button';
import { Input } from '../../components/UI/Input/Input';
import { MockTodos } from '../../shared/mockData';
import { validateControl } from '../../shared/validation';
import classes from './TodoPage.module.scss';

export class TodoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const idTodoInURL = +window.location.href.split('/').at(-1);

    Promise.resolve()
      .then(() => {
        const todo = MockTodos.todos.find((todo) => todo.id === idTodoInURL);
        this.setState((state) => ({
          todo: (state.todo = todo),
        }));
      })
      .then(() =>
        this.setState((state) => {
          state.formControls.text.value = this.state.todo.text;

          return state;
        })
      );
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
        date: new Date(),
      }
    );
    console.log(updatedTodo);
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

  render() {
    const control = this.state.formControls['text'];

    return (
      <div className={classes.TodoPage}>
        <h3>Change task</h3>
        <form onSubmit={this.submitHandler} className={classes.TodoPageForm}>
          <Input
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
