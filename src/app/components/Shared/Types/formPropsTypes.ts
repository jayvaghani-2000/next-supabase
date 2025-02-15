import { FormikErrors, FormikTouched, FormikValues } from "formik";

export type FormPropType = {
  values: FormikValues;
  initialValues: FormikValues;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FormikErrors<FormikValues>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<FormikValues>>;
  touched: FormikTouched<FormikValues>;
  handleBlur: (e: React.FocusEvent<any, Element>) => void;
};
