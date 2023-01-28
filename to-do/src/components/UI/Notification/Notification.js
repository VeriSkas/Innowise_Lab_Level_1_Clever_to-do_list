import { useTranslation } from 'react-i18next';

import { NotificationTitle } from '@constants/text';

import classes from './Notification.module.scss';

export const Notification = (props) => {
  const { t } = useTranslation();
  const type = props.type || NotificationTitle.success;

  return (
    <div className={`${classes.Notification} ${classes[type]}`}>
      <h3>{t(type)}</h3>
      <p>{t(props.text)}</p>
    </div>
  );
};
