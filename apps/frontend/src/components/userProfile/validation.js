import * as yup from 'yup';

export const userProfileFormSchema = yup.object({
  firstName: yup.string(),
  lastName: yup.string(),
  nickName: yup.string().required(),
  birthDate: yup.date(),
  email: yup
    .string()
    .email()
    .matches(/@[^.]*\./)
    .required(),
});
