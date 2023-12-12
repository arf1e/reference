import * as yup from 'yup';

export const bookValidationSchema = yup.object({
  title: yup.string().required(),
  isbn: yup.string().required().min(7).max(13),
  publisher: yup.string().required(),
  image: yup.string(),
  authors: yup.array().of(yup.string().required()).min(1).required(),
  genres: yup.array().of(yup.string().required()).min(1).required(),
  publishedDate: yup.string().required(),
});
