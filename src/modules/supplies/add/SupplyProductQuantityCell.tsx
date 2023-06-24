import { FC, useRef } from 'react';
import { useFormState } from 'react-hook-form';
import { InputWithTooltipAdapter } from '../../../components/FormFieldsAdapter';
import { useTranslation } from '../../../components/IntlProvider';
import { supplyFormFields, supplyFormProductsSubfields } from './constants';
import { SupplyFormValues, SupplyProductCellProps } from './types';
import { calculateSummary, parseToDecimal } from './utils';
import { InputFormValue } from '../../../components/Fields/Input';
import { DECIMAL } from '../../../common/constants/regex';

import bigDecimal from 'js-big-decimal';

const ZERO_VALUE = parseToDecimal('0');

const {
  quantity: quantitySubfield,
  price: priceSubfield,
  totalCost: totalCostSubfield,
} = supplyFormProductsSubfields;

export const SupplyProductQuantityCell: FC<SupplyProductCellProps> = ({
  index,
  control,
  setValue,
  getValues,
  fieldCommonName,
}) => {
  const prevSummaryQuantity = useRef<string | null>(null);

  const { translate } = useTranslation();

  const { errors } = useFormState({ control });

  const fieldNamePrefix = `${fieldCommonName}.${index}` as const;
  const quantityFieldName = `${fieldNamePrefix}.${quantitySubfield}` as const;
  const priceFieldName = `${fieldNamePrefix}.${priceSubfield}` as const;
  const totalCostFieldName = `${fieldNamePrefix}.${totalCostSubfield}` as const;

  const formatQuantityValue = (value: string, prevValue: string): string => {
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
      const decimalQuantityValue = parseToDecimal(value);
      const { price, totalCost } = getValues(`products.${index}`) || {};
      const hasQuantity = decimalQuantityValue !== ZERO_VALUE;
      const hasPrice = price && price !== ZERO_VALUE;
      const hasTotalCost = totalCost && totalCost !== ZERO_VALUE;

      const fieldArrayErrors = errors.products ? errors.products[index] : {};

      initiateSummaryFieldValueCalculation(
        prevSummaryQuantity.current,
        decimalQuantityValue,
        supplyFormFields.productsTotalQuantity,
      );

      // To avoid auto setting field value as '0.00' if the field is empty
      if (value.trim()) {
        setValue(quantityFieldName, decimalQuantityValue, {
          shouldValidate: !!fieldArrayErrors?.quantity,
        });
      }

      if (hasPrice) {
        const prevTotalCostValue = hasTotalCost ? totalCost : ZERO_VALUE;
        const newTotalCostValue = hasQuantity
          ? parseToDecimal(bigDecimal.multiply(price, decimalQuantityValue))
          : ZERO_VALUE;

        initiateSummaryFieldValueCalculation(
          prevTotalCostValue,
          newTotalCostValue,
          supplyFormFields.productsTotalCost,
        );

        return setValue(totalCostFieldName, newTotalCostValue, {
          shouldValidate: !!fieldArrayErrors?.totalCost,
        });
      }

      if (hasTotalCost && hasQuantity) {
        const newPriceValue = parseToDecimal(
          bigDecimal.divide(totalCost, decimalQuantityValue, 2),
        );

        return setValue(priceFieldName, newPriceValue, {
          shouldValidate: !!fieldArrayErrors?.price,
        });
      }
    }
  };

  const handleInputFocus = (value: InputFormValue) => {
    if (typeof value === 'string') {
      prevSummaryQuantity.current = value;
    }
  };

  return (
    <InputWithTooltipAdapter
      isRequired
      size="xs"
      name={`${fieldCommonName}.${index}.${supplyFormProductsSubfields.quantity}`}
      ariaLabel={translate('supply.product.quantity')}
      formatValue={formatQuantityValue}
      onBlur={handleInputBlur}
      onFocus={handleInputFocus}
      control={control}
    />
  );
};
