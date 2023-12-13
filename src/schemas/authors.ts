import * as yup from 'yup';

export const authorValidationSchema = yup.object().shape({
  name: yup.string().required(),
  bio: yup.string().required(),
  image: yup.string(),
});
