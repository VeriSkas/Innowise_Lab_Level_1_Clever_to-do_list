import { Component } from 'react';
import { Link } from 'react-router-dom';

import { signUpHandler } from '@queries/apiHandlers/SignUpHandler';
import { Button } from '@components/UI/Button/Button';
import { Input } from '@components/UI/Input/Input';
import { validateControl } from '@validation/validation';
import classes from './SignUp.module.scss';
import { PATH } from '@constants/paths';
import {
  ButtonText,
  ButtonType,
  ErrorMessageText,
  InputType,
  LabelText,
  TextTitle,
} from '@constants/text';

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      formControls: {
        email: {
          value: '',
          type: InputType.email,
          label: LabelText.email,
          errorMessage: ErrorMessageText.email,
          valid: false,
          touched: false,
          validation: {
            required: true,
            email: true,
          },
        },
        password: {
          value: '',
          type: InputType.password,
          label: LabelText.password,
          errorMessage: ErrorMessageText.password,
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 6,
          },
        },
        password2: {
          value: '',
          type: InputType.password,
          label: LabelText.password2,
          errorMessage: ErrorMessageText.password2,
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
      <div className={`${classes.SignUp} ${classes[this.props.theme]}`}>
        <div>
          <h1>{TextTitle.signUp}</h1>

          <form
            onSubmit={this.submitHandler}
            className={`${classes.SignUpForm} ${classes[this.props.theme]}`}
          >
            {this.renderInputs()}
            <div className={classes.SignUpFormBtns}>
              <Button
                type={ButtonType.success}
                onClick={this.registrHandler}
                disabled={!this.state.isFormValid}
              >
                {ButtonText.signUpSubmit}
              </Button>
              <Link to={PATH.auth}>
                <Button>{ButtonText.return}</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
