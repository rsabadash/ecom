import { AttributeFormDefaultValues } from '../common/types';

export type AttributeEditFormProps = {
  id: string | undefined;
  isReadOnly: boolean;
  defaultValues: AttributeFormDefaultValues | undefined;
  onFormReset: () => void;
  onFormUpdated: () => void;
  attributeName: string | undefined;
};

export type AttributeDetailActionsProps = {
  onEdit: () => void;
  onDelete: () => Promise<void>;
  isReadOnly: boolean;
};

export type AttributeUrlParams = {
  attributeId: string;
};
