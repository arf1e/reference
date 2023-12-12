import * as yup from 'yup';

export const genresSchema = yup.object().shape({
  title: yup.string().required().min(1),
});
