import { FC } from 'react';
import { useFormState } from 'react-hook-form';
import bigDecimal from 'js-big-decimal';

import { DECIMAL } from '../../../common/constants/regex';
import { InputFormValue } from '../../../components/Fields/Input';
import { InputWithTooltipAdapter } from '../../../components/FormFieldsAdapter';
import { useTranslation } from '../../../components/IntlProvider';
import { supplyFormFields, supplyFormProductsSubfields } from './constants';
import { SupplyFormValues, SupplyProductCellProps } from './types';
import { calculateSummary, parseToDecimal } from './utils';

const ZERO_VALUE = parseToDecimal('0');
const { price: priceSubfield, totalCost: totalCostSubfield } =
  supplyFormProductsSubfields;

export const SupplyProductPriceCell: FC<SupplyProductCellProps> = ({
  index,
  control,
  setValue,
  getValues,
  fieldCommonName,
}) => {
  const { translate } = useTranslation();

  const { errors } = useFormState({ control });

  const fieldNamePrefix = `${fieldCommonName}.${index}` as const;
  const priceFieldName = `${fieldNamePrefix}.${priceSubfield}` as const;
  const totalCostFieldName = `${fieldNamePrefix}.${totalCostSubfield}` as const;

  const formatPriceValue = (value: string, prevValue: string): string => {
    if (DECIMAL.test(value) || !value) {
      return value;
    }

    return prevValue;
  };

  const initiateSummaryFieldValueCalculation = (
    prevValue: string | null,
    currentValue: string,
    summaryFieldName: keyof SupplyFormValues,
  ) => {
    const summaryValue = (getValues(summaryFieldName) as string) || ZERO_VALUE;

    const newSummaryValue = calculateSummary<string>(
      prevValue,
      currentValue,
      summaryValue,
    );

    setValue(summaryFieldName, newSummaryValue, {
      shouldValidate: false,
    });
  };

  const handleInputBlur = (value: InputFormValue): void => {
    if (typeof value === 'string') {
      const decimalPriceValue = parseToDecimal(value);
      const { quantity, totalCost } = getValues(`products.${index}`) || {};
      const hasPrice = decimalPriceValue !== ZERO_VALUE;
      const hasQuantity = quantity && quantity !== ZERO_VALUE;
      const hasTotalCost = totalCost && totalCost !== ZERO_VALUE;

      const fieldArrayErrors = errors.products ? errors.products[index] : {};

      const avoidTotalCostCalculation = !hasPrice || !hasQuantity;

      const prevTotalCostValue = hasTotalCost ? totalCost : ZERO_VALUE;
      const newTotalCost = avoidTotalCostCalculation
        ? ZERO_VALUE
        : parseToDecimal(bigDecimal.multiply(value, quantity));

      initiateSummaryFieldValueCalculation(
        prevTotalCostValue,
        newTotalCost,
        supplyFormFields.productsTotalCost,
      );

      // To avoid auto setting field value as '0.00' if the field is empty
      if (value.trim()) {
        setValue(totalCostFieldName, newTotalCost, {
          shouldValidate: !!fieldArrayErrors?.totalCost,
        });

        setValue(priceFieldName, decimalPriceValue, {
          shouldValidate: !!fieldArrayErrors?.price,
        });
      }
    }
  };

  return (
    <InputWithTooltipAdapter
      isRequired
      size="xs"
      name={priceFieldName}
      formatValue={formatPriceValue}
      onBlur={handleInputBlur}
      ariaLabel={translate('supply.product.price')}
      control={control}
    />
  );
};
