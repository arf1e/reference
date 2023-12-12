import { FormikProps } from 'formik';

type FormImagePart = { imageFile: File | null; image: string };

export const hasImage = <FormValues extends FormImagePart>(
  values: FormValues
) => {
  return Boolean(values.imageFile) || Boolean(values.image);
};

export const getImageUrl = <FormValues extends FormImagePart>(
  values: FormValues
) => {
  return values.imageFile
    ? URL.createObjectURL(values.imageFile)
    : values.image;
};

export const handleClearImage = <
  FPropsWithImagery extends FormikProps<FormImagePart & any>,
>(
  formikProps: FPropsWithImagery
) => {
  formikProps.setFieldValue('imageFile', null);
  formikProps.setFieldValue('image', '');
};
