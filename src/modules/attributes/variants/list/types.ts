import { Translations } from '../../../../components/IntlProvider';
import { VariantWithAttributeId } from '../common/types';

export type VariantWithAttribute = VariantWithAttributeId & {
  attributeName: Translations;
};
