// Min 8 letter password, with at least a symbol, upper and lower case letters and a number.
// eslint-disable-next-line import/prefer-default-export
export const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
