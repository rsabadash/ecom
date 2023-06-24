import { FC, useRef } from 'react';
import { useFormState } from 'react-hook-form';
import { InputWithTooltipAdapter } from '../../components/FormFieldsAdapter';
import { useTranslation } from '../../components/IntlProvider';
import { SupplyFormValues, SupplyProductCellProps } from './types';
import { supplyFormFields, supplyFormProductsSubfields } from './constants';
import { calculateSummary, parseToDecimal } from './utils';
import { DECIMAL } from '../../common/constants/regex';
import { InputFormValue } from '../../components/Fields/Input';

import bigDecimal from 'js-big-decimal';

const ZERO_VALUE = parseToDecimal('0');

const {
  quantity: quantitySubfield,
  price: priceSubfield,
  totalCost: totalCostSubfield,
} = supplyFormProductsSubfields;

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

  const fieldNamePrefix = `${fieldCommonName}.${index}` as const;
  const totalCostFieldName = `${fieldNamePrefix}.${totalCostSubfield}` as const;
  const priceFieldName = `${fieldNamePrefix}.${priceSubfield}` as const;
  const quantityFieldName = `${fieldNamePrefix}.${quantitySubfield}` as const;

  const formatTotalCostValue = (value: string, prevValue: string): string => {
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

  const handleInputBlur = (value: InputFormValue) => {
    if (typeof value === 'string') {
      const decimalTotalCostValue = parseToDecimal(value);
      const { quantity, price } = getValues(`products.${index}`) || {};
      const hasTotalCost = decimalTotalCostValue !== ZERO_VALUE;
      const hasQuantity = quantity && quantity !== ZERO_VALUE;

      const fieldArrayErrors = errors.products ? errors.products[index] : {};

      initiateSummaryFieldValueCalculation(
        prevSummaryTotalCostRef.current,
        decimalTotalCostValue,
        supplyFormFields.productsTotalCost,
      );

      // To avoid auto setting field value as '0.00' if the field is empty
      if (value.trim()) {
        setValue(totalCostFieldName, decimalTotalCostValue, {
          shouldValidate: !!fieldArrayErrors?.totalCost,
        });
      }

      if (hasQuantity && hasTotalCost) {
        const newPrice = parseToDecimal(
          bigDecimal.divide(decimalTotalCostValue, quantity, 2),
        );

        return setValue(priceFieldName, newPrice, {
          shouldValidate: !!fieldArrayErrors?.price,
        });
      }

      const hasPrice = price && price !== ZERO_VALUE;

      if (!hasQuantity && hasTotalCost && hasPrice) {
        const newQuantity = parseToDecimal(
          bigDecimal.divide(decimalTotalCostValue, price, 2),
        );

        setValue(quantityFieldName, newQuantity, {
          shouldValidate: !!fieldArrayErrors?.price,
        });
      }
    }
  };

  const handleInputFocus = (value: InputFormValue) => {
    if (typeof value === 'string') {
      prevSummaryTotalCostRef.current = value;
    }
  };
  // TODO Show modal if user want to select item that already selected
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
