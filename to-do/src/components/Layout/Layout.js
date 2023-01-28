import { useTranslation } from 'react-i18next';

import { logOut } from '@queries/apiHandlers/LogOutHandler';
import { Button } from '../UI/Button/Button';
import { Notification } from '../UI/Notification/Notification';
import classes from './Layout.module.scss';

export const Layout = (props) => {
  const { t } = useTranslation();

  const logOutHandler = () => {
    logOut();
  };

  return (
    <div className={`${classes.Layout} ${classes[props.theme]}`}>
      {props.isLoggedIn ? (
        <header>
          <div className={classes.HeaderLogo}>
            <div className={classes.Logo}></div>
            <h1>{t('Calendar')}</h1>
          </div>
          <div>
            <Button onClick={logOutHandler}>{t('Log out')}</Button>
          </div>
        </header>
      ) : null}
      <main>{props.children}</main>
      {props.notification ? <Notification {...props.notification} /> : null}
    </div>
  );
};
