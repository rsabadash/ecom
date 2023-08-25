import { FC, useRef } from 'react';
import { useFormState } from 'react-hook-form';

import { DECIMAL_TWO_SIGN } from '../../../common/constants/regex';
import { useCalculation } from '../../../common/hooks';
import { InputFormValue } from '../../../components/Fields/Input';
import { InputWithTooltipAdapter } from '../../../components/FormFieldsAdapter';
import { useTranslation } from '../../../components/IntlProvider';
import {
  supplyFormFields,
  supplyFormProductsSubfields,
  ZERO_VALUE,
} from './constants';
import { SupplyFormValues, SupplyProductCellProps } from './types';
import { calculateSummary } from './utils';

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
  const { multiply, divide, round } = useCalculation();

  const { errors } = useFormState({ control });

  const fieldNamePrefix = `${fieldCommonName}.${index}` as const;
  const quantityFieldName = `${fieldNamePrefix}.${quantitySubfield}` as const;
  const priceFieldName = `${fieldNamePrefix}.${priceSubfield}` as const;
  const totalCostFieldName = `${fieldNamePrefix}.${totalCostSubfield}` as const;

  const formatQuantityValue = (value: string, prevValue: string): string => {
    if (DECIMAL_TWO_SIGN.test(value) || !value) {
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
      const decimalQuantityValue = round(value);
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
          ? round(multiply(price, decimalQuantityValue))
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
        const newPriceValue = round(divide(totalCost, decimalQuantityValue));

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
