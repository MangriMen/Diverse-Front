import { SHAPE_CONSTRAINTS } from 'consts/auth';
import * as yup from 'yup';

export const settingsValidator = yup.object().shape({
  name: yup
    .string()
    .trim()
    .max(SHAPE_CONSTRAINTS.PASSWORD_MAX, 'сharactersCount'),
  username: yup
    .string()
    .trim()
    .max(SHAPE_CONSTRAINTS.PASSWORD_MAX, 'сharactersCount'),
});
