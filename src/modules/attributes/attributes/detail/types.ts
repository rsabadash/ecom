import { AttributeFormDefaultValues } from '../common/types';

export type AttributeEditFormProps = {
  id?: string;
  isReadOnly: boolean;
  defaultValues: AttributeFormDefaultValues | undefined;
  onFormUpdated: () => void;
  attributeName: string | undefined;
};

export type AttributeUrlParams = {
  attributeId: string;
};
