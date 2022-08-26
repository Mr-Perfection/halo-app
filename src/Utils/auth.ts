// Min 8 letter password, with at least a symbol, upper and lower case letters and a number.

import paths from 'constants/nav';

// eslint-disable-next-line import/prefer-default-export
export const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

// If you need to redirect within react app, use useNavigate instead.
export const redirectToLogin = () => {
  window.history.pushState({}, '', paths.LOGIN);
  window.location.reload();
};
