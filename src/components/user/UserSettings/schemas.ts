import { SHAPE_CONSTRAINTS } from 'consts/auth';
import * as yup from 'yup';

export const settingsValidator = yup.object().shape({
  name: yup
    .string()
    .trim()
    .max(SHAPE_CONSTRAINTS.PASSWORD_MAX, 'charactersCount'),
  username: yup
    .string()
    .trim()
    .max(SHAPE_CONSTRAINTS.PASSWORD_MAX, 'charactersCount'),
});

export const changePasswordValidation = yup.object().shape({
  old_password: yup
    .string()
    .trim()
    .min(SHAPE_CONSTRAINTS.PASSWORD_MIN, 'сharactersCount')
    .max(SHAPE_CONSTRAINTS.USERNAME_MAX, 'сharactersCount')
    .matches(/^\S*$/, 'passwordMustNotContainSpaces')
    .required('emptyPassword'),
  password: yup
    .string()
    .trim()
    .min(SHAPE_CONSTRAINTS.PASSWORD_MIN, 'сharactersCount')
    .max(SHAPE_CONSTRAINTS.USERNAME_MAX, 'сharactersCount')
    .matches(/^\S*$/, 'passwordMustNotContainSpaces')
    .required('emptyPassword'),
  passwordConfirm: yup
    .string()
    .trim()
    .oneOf([yup.ref('password'), null], 'matchConfirmPassword'),
});
