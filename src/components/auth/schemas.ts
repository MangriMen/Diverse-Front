import * as yup from 'yup';

export const loginValidator = yup.object().shape({
  email: yup.string().email('errorEmail').required('emptyEmail'),
  password: yup
    .string()
    .min(8, 'сharactersCount')
    .max(32, 'сharactersCount')
    .required('emptyPassword'),
});

export const registerValidator = yup.object().shape({
  name: yup.string().max(32, 'сharactersCount').required('emptyName'),
  username: yup.string().max(32, 'сharactersCount').required('emptyUserName'),
  email: yup.string().email().required('emptyEmail'),
  password: yup
    .string()
    .min(8, 'сharactersCount')
    .max(32, 'сharactersCount')
    .matches(/^\S*$/, 'passwordMustNotContainSpaces')
    .required('emptyPassword'),
});
