import * as yup from 'yup';

export const imageValidator = yup.object().shape({
  file: yup.mixed().required('File is required'),
});
