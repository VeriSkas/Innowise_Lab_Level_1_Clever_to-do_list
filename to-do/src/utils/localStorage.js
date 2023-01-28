import { LocalStorageHandlerFunc } from '@constants/text';

export function localStorageHandler(func, key, body) {
  switch (func) {
    case LocalStorageHandlerFunc.set:
      localStorage.setItem(key, JSON.stringify(body));
      break;
    case LocalStorageHandlerFunc.get:
      return JSON.parse(localStorage.getItem(key));
    case LocalStorageHandlerFunc.remove:
      localStorage.removeItem(key);
      break;
    case LocalStorageHandlerFunc.clear:
      localStorage.clear();
      break;
    default:
      break;
  }
}
