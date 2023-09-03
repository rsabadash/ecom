import { FIELD_DESCRIPTION_TYPE } from './constatns';

export type FieldDescriptionType = ValuesOfObject<
  typeof FIELD_DESCRIPTION_TYPE
>;

export type FieldDescriptionProps = {
  id?: string;
  type?: FieldDescriptionType;
  message: string;
  descriptionClassName?: string;
};
