import { fieldDescriptionType } from './constatns';

export type FieldDescriptionType = ValuesOfObject<typeof fieldDescriptionType>;

export type FieldDescriptionProps = {
  id?: string;
  type?: FieldDescriptionType;
  message: string;
  descriptionClassName?: string;
};
