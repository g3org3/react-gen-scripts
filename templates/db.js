
const APPID = '__appname__';
const MLocalStorage = {
  store: {},
  getItem: (key) => MLocalStorage.store[key],
  setItem: (key, value) => MLocalStorage.store[key] = value,
}

export const get = (key) => {
  let raw = '';
  try {
    raw = localStorage.getItem(`${APPID}.${key}`);
  } catch (e) {
    raw = MLocalStorage.getItem(`${APPID}.${key}`);
  }
  let value = ';;';
  try {
    value = JSON.parse(raw);
  } catch (e) {
    value = raw;
  }

  return value;
}

export const set = (key, value) => {
  try {
    return localStorage.setItem(`${APPID}.${key}`, JSON.stringify(value))
  } catch(e) {
    return MLocalStorage.setItem(`${APPID}.${key}`, JSON.stringify(value))
  }
}