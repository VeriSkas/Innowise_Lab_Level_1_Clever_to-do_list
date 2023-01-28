import { localStorageHandler } from '@utils/localStorage';

export const themes = {
  light: 'lightTheme',
  dark: 'darkTheme',
};

export const changeTheme = (theme = themes.light) => {
  const currentTheme = localStorageHandler('getItem', 'theme') || themes.light;

  currentTheme === theme
    ? null
    : localStorageHandler('setItem', 'theme', theme);
};
