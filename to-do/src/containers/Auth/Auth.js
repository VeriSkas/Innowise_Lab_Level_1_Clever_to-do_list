import { Component } from 'react';
import { Link } from 'react-router-dom';

import { authHandler } from '../../api/apiHandlers/AuthHandler';
import { Button } from '../../components/UI/Button/Button';
import { Input } from '../../components/UI/Input/Input';
import { validateControl } from '../../shared/validation';
import classes from './Auth.module.scss';

export class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isFormValid: false,
      formControls: {
        email: {
          value: '',
          type: 'email',
          label: 'Email',
          errorMessage: 'Enter valid email',
          valid: false,
          touched: false,
          validation: {
            required: true,
            email: true,
          },
        },
        password: {
          value: '',
          type: 'password',
          label: 'Password',
          errorMessage: 'Enter valid password',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 6,
          },
        },
      },
    };
  }

  loginHandler = async () => {
    const { email, password } = this.state.formControls;

    if (email.value && password.value) {
      const response = await authHandler(email.value, password.value);

      await this.props.responseHandler(response);
    }
  };

  submitHandler = (event) => {
    event.preventDefault();
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

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, i) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={i}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authorization</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}
            <div className={classes.AuthFormBtns}>
              <Button
                type="success"
                onClick={this.loginHandler}
                disabled={!this.state.isFormValid}
              >
                Let`s start
              </Button>
              <Link to={'/sign-up'}>
                <Button>Sign up</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
