import classes from './Notification.module.scss';

export const Notification = (props) => {
  const type = props.type || 'Success';
  const cls = [classes.Notification, classes[type]];

  return (
    <div className={cls.join(' ')}>
      <h3>{type}</h3>
      <p>{props.text}</p>
    </div>
  );
};
