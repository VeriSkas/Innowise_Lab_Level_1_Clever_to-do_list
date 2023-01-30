import { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import { authHandler } from '@queries/apiHandlers/AuthHandler';
import { Button } from '@components/UI/Button/Button';
import { Input } from '@components/UI/Input/Input';
import { validateControl } from '@validation/validation';
import classes from './Auth.module.scss';
import { PATH } from '@constants/paths';
import {
  ButtonText,
  ErrorMessageText,
  InputType,
  LabelText,
  TextTitle,
  ButtonType,
} from '@constants/text';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
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
    const { t } = this.props;

    return (
      <div className={`${classes.Auth} ${classes[this.props.theme]}`}>
        <div>
          <h1>{t(TextTitle.auth)}</h1>

          <form
            onSubmit={this.submitHandler}
            className={`${classes.AuthForm} ${classes[this.props.theme]}`}
          >
            {this.renderInputs()}
            <div className={classes.AuthFormBtns}>
              <Button
                type={ButtonType.success}
                onClick={this.loginHandler}
                disabled={!this.state.isFormValid}
              >
                {t(ButtonText.loginSubmit)}
              </Button>
              <Link to={PATH.signUp}>
                <Button>{t(ButtonText.loginToSignUp)}</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Auth);
