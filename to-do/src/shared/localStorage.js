export function localStorageHandler(func, key, body) {
  switch (func) {
    case 'setItem':
      localStorage.setItem(key, JSON.stringify(body));
      break;
    case 'getItem':
      return JSON.parse(localStorage.getItem(key));
    case 'removeItem':
      localStorage.removeItem(key);
      break;
    case 'clear':
      localStorage.clear();
      break;
    default:
      break;
  }
}
