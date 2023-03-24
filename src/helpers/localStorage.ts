export const storageGet = (key: string) => {
  const item = localStorage.getItem(key);
  return item != null ? JSON.parse(item) : item;
};

export const storageSet = (key: string, value: unknown) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const storageRemove = (key: string) => {
  localStorage.removeItem(key);
};
