import classes from './Button.module.scss';

export const Button = (props) => {
  return (
    <button
      className={`${classes.Button} ${classes[props.theme]}`}
      onClick={props.onClick ? () => props.onClick() : null}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
