import { object, string } from 'yup';

export const dropdownItem = {
  id: string().required(),
  value: string().required(),
  meta: object().nullable().notRequired(),
};
