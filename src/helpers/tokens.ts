export const getAuthToken = () => {
  return localStorage.getItem('authTokenDiverse');
};

export const setAuthToken = (authToken: string) => {
  return localStorage.setItem('authTokenDiverse', authToken);
};

export const deleteAuthToken = () => {
  localStorage.removeItem('authTokenDiverse');
};
