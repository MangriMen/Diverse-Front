import * as yup from 'yup';

export const postValidator = yup.object().shape({
  content: yup.string().required('Content is required'),
  description: yup.string().required('Desc is required'),
});
