import { useTranslation } from 'react-i18next';

import classes from './Input.module.scss';
import { InputType, ErrorMessageText } from '@constants/text';

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

export const Input = (props) => {
  const { t } = useTranslation();
  const theme = props.theme ? classes[props.theme] : '';
  const cls = [classes.Input, theme];

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={props.label}>{props.label}</label>
      <input
        type={props.type || InputType.text}
        id={props.label}
        value={props.value}
        readOnly={props.readOnly || false}
        onChange={props.onChange}
      />
      {isInvalid(props) ? (
        <span>{t(props.errorMessage) || t(ErrorMessageText.default)}</span>
      ) : null}
    </div>
  );
};
