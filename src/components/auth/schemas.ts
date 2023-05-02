import { SHAPE_CONSTRAINTS } from 'consts/auth';
import * as yup from 'yup';

export const loginValidator = yup.object().shape({
  email: yup.string().email('errorEmail').required('emptyEmail'),
  password: yup
    .string()
    .min(SHAPE_CONSTRAINTS.PASSWORD_MIN, 'сharactersCount')
    .max(SHAPE_CONSTRAINTS.PASSWORD_MAX, 'сharactersCount')
    .required('emptyPassword'),
});

export const registerValidator = yup.object().shape({
  username: yup
    .string()
    .max(SHAPE_CONSTRAINTS.USERNAME_MAX, 'сharactersCount')
    .required('emptyName'),
  email: yup.string().email().required('errorEmail'),
  password: yup
    .string()
    .min(SHAPE_CONSTRAINTS.PASSWORD_MIN, 'сharactersCount')
    .max(SHAPE_CONSTRAINTS.USERNAME_MAX, 'сharactersCount')
    .matches(/^\S*$/, 'passwordMustNotContainSpaces')
    .required('emptyPassword'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'matchConfirmPassword'),
});
