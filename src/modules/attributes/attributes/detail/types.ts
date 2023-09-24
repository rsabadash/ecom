import { AttributePostData } from '../add/types';
import { AttributeFormDefaultValues } from '../common/types';

export type AttributeEditFormProps = {
  id?: string;
  isReadOnly: boolean;
  defaultValues: AttributeFormDefaultValues | undefined;
  onFormUpdated: () => void;
};

export type AttributePatchData = AttributePostData & { id: string };

export type AttributeDeleteData = {
  id: string;
};

export type AttributeUrlParams = {
  attributeId: string;
  variantId: string;
};
