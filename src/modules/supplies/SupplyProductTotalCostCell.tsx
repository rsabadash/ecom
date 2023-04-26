import { FC, useRef } from 'react';
import { useFormState } from 'react-hook-form';
import { InputWithTooltipAdapter } from '../../components/FormFieldsAdapter';
import { useTranslation } from '../../components/IntlProvider';
import { SupplyProductCellProps } from './types';
import { supplyFormFields, supplyFormProductsSubfields } from './constants';
import { calculateSummary, parseToDecimal } from './utils';
import { DECIMAL } from '../../common/constants/regExp';
import { InputFormValue } from '../../components/Fields/Input';

import bigDecimal from 'js-big-decimal';

export const SupplyProductTotalCostCell: FC<SupplyProductCellProps> = ({
  index,
  control,
  setValue,
  getValues,
  fieldCommonName,
}) => {
  const prevSummaryTotalCostRef = useRef<string | null>(null);

  const { translate } = useTranslation();

  const { errors } = useFormState({ control });

  const totalCostFieldName =
    `${fieldCommonName}.${index}.${supplyFormProductsSubfields.totalCost}` as const;
  const quantityFieldName =
    `${fieldCommonName}.${index}.${supplyFormProductsSubfields.price}` as const;

  const formatTotalCostValue = (value: string, prevValue: string): string => {
    if (DECIMAL.test(value) || !value) {
      return value;
    }

    return prevValue;
  };

  const initiateSummaryTotalCostCalculation = (
    prevValue: string | null,
    currentValue: string,
  ) => {
    const summaryTotalCost =
      (getValues(supplyFormFields.productsTotalCost) as string) ||
      parseToDecimal('0');

    const newSummaryTotalCost = calculateSummary<string>(
      prevValue,
      currentValue,
      summaryTotalCost,
    );

    prevSummaryTotalCostRef.current = newSummaryTotalCost;

    setValue(supplyFormFields.productsTotalCost, newSummaryTotalCost, {
      shouldValidate: false,
    });
  };

  const handleInputBlur = (value: InputFormValue) => {
    if (typeof value === 'string' && value.trim() !== '') {
      const decimalTotalCostValue = parseToDecimal(value);
      const { quantity } = getValues(`products.${index}`) || {};

      const newPrice = quantity
        ? bigDecimal.divide(value, quantity, 2)
        : decimalTotalCostValue;

      const fieldArrayErrors = errors.products ? errors.products[index] : {};

      initiateSummaryTotalCostCalculation(
        prevSummaryTotalCostRef.current,
        decimalTotalCostValue,
      );

      setValue(quantityFieldName, newPrice, {
        shouldValidate: !!fieldArrayErrors?.price,
      });
      setValue(totalCostFieldName, decimalTotalCostValue, {
        shouldValidate: !!fieldArrayErrors?.totalCost,
      });
    }
  };

  const handleInputFocus = (value: InputFormValue) => {
    if (typeof value === 'string' && value.trim() !== '') {
      prevSummaryTotalCostRef.current = parseToDecimal(value);
    }
  };

  return (
    <InputWithTooltipAdapter
      isRequired
      size="xs"
      name={totalCostFieldName}
      ariaLabel={translate('supply.product.totalCost')}
      formatValue={formatTotalCostValue}
      onBlur={handleInputBlur}
      onFocus={handleInputFocus}
      control={control}
    />
  );
};
