import { Component } from 'react';
import { Link } from 'react-router-dom';

import { signUpHandler } from '../../api/apiHandlers/SignUpHandler';
import { Button } from '../../components/UI/Button/Button';
import { Input } from '../../components/UI/Input/Input';
import { validateControl } from '../../shared/validation';
import classes from './SignUp.module.scss';

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        password2: {
          value: '',
          type: 'password',
          label: 'Repeat password',
          errorMessage: 'Your passwords don`t equal',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 6,
            isEqual: true,
          },
        },
      },
    };
  }

  registrHandler = async () => {
    const { email, password } = this.state.formControls;

    if (email.value && password.value) {
      const response = await signUpHandler(email.value, password.value);

      await this.props.responseHandler(response);
    }
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    let password;
    let isFormValid = true;

    control.value = event.target.value;
    password = formControls.password.value || null;
    control.touched = true;

    if (controlName === 'password' && formControls.password2.touched) {
      formControls.password2.valid = validateControl(
        formControls.password2.value,
        formControls.password2.validation,
        control.value
      );
    }

    control.valid = validateControl(
      control.value,
      control.validation,
      password
    );

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
          theme={this.props.theme}
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
      <div className={[classes.SignUp, classes[this.props.theme]].join(' ')}>
        <div>
          <h1>Sign Up</h1>

          <form
            onSubmit={this.submitHandler}
            className={[classes.SignUpForm, classes[this.props.theme]].join(
              ' '
            )}
          >
            {this.renderInputs()}
            <div className={classes.SignUpFormBtns}>
              <Button
                type="success"
                onClick={this.registrHandler}
                disabled={!this.state.isFormValid}
              >
                Sign up
              </Button>
              <Link to={'/auth'}>
                <Button>Return</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
