import * as yup from 'yup';

export const commentValidator = yup.object().shape({
  content: yup.string().required(),
});
