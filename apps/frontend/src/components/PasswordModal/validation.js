import * as yup from 'yup';

export const userPasswordSchema = yup.object({
  oldPassword: yup.string(),
  newPassword: yup
    .string()
    .min(8, 'Пароль слишком короткий. Минимальная длина - 8 символов.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Пароли должны совпадать'),
});
