import { VariantWithAttributeId } from '../common/types';

export type VariantWithAttribute = VariantWithAttributeId & {
  attributeName: string;
};
