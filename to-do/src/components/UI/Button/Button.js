import classes from './Button.module.scss';

export const Button = (props) => {
  const cls = [classes.Button, classes[props.type]];

  return (
    <button
      className={cls.join(' ')}
      onClick={props.onClick ? () => props.onClick() : null}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
