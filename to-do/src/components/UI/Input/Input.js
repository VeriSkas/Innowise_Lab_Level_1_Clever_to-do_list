import classes from './Input.module.scss';

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

export const Input = (props) => {
  const cls = [classes.Input];

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={props.label}>{props.label}</label>
      <input
        type={props.type || 'text'}
        id={props.label}
        value={props.value}
        readOnly={props.readOnly || false}
        onChange={props.onChange}
      />
      {isInvalid(props) ? (
        <span>{props.errorMessage || 'Enter right value'}</span>
      ) : null}
    </div>
  );
};
