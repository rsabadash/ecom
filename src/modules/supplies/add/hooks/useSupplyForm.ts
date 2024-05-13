import { yupResolver } from '@hookform/resolvers/yup';
import { array, lazy, object, ObjectSchema, string } from 'yup';

import {
  DECIMAL_TWO_SIGN_POSITIVE,
  DECIMAL_TWO_SIGN_ZERO,
} from '../../../../common/constants/regex';
import { UNITS_LIST } from '../../../../common/constants/units';
import { useCustomForm } from '../../../../common/hooks';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
} from '../../../../common/hooks/useCustomForm';
import { Unit } from '../../../../common/types/unit';
import { calculation } from '../../../../common/utils';
import { objectErrorMessage } from '../../../../components/FormFieldsAdapter/utils';
import { dropdownItem } from '../../../../validations/schemas/dropdown';
import { SupplyFormValues } from '../types';
import { isUnitSupportDecimal } from '../utils';

type UseSupplyFormProps = Pick<
  UseCustomFormProps<SupplyFormValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: Partial<SupplyFormValues>;
};

type UseSupplyFormReturn = Pick<
  UseCustomFormReturn<SupplyFormValues>,
  'control' | 'setValue' | 'getValues' | 'handleSubmit'
>;

const schema: ObjectSchema<SupplyFormValues> = object({
  name: string().required().nullable(),
  supplier: object(dropdownItem).required('supply.supplier.error.required'),
  warehouse: object(dropdownItem).required('supply.warehouse.error.required'),
  products: array()
    .of(
      object({
        name: object({
          ...dropdownItem,
          meta: object({
            unit: string<Unit>()
              .oneOf(UNITS_LIST, 'error.dropdown.unsupportedValue')
              .required(),
          }).required(),
        }).required('supply.product.name.error.required'),
        unit: object({
          ...dropdownItem,
          id: string<Unit>().required(),
        }).required('supply.product.unit.error.required'),
        quantity: lazy((value, options) => {
          const { name, unit } = options?.parent || {};

          if (!name) {
            return string().required('supply.product.quantity.error.required');
          }

          const { id, value: unitValue } = unit || {};
          const isSupportDecimal =
            value === calculation.round('0') || isUnitSupportDecimal(id);

          const DECIMAL_REGEX = isSupportDecimal
            ? DECIMAL_TWO_SIGN_POSITIVE
            : DECIMAL_TWO_SIGN_ZERO;

          const errorTranslation = isSupportDecimal
            ? 'supply.product.quantity.error.min'
            : 'supply.product.quantity.error.onlyInteger';

          const errorValue = isSupportDecimal ? 1 : unitValue.toLowerCase();

          return string()
            .required('supply.product.quantity.error.required')
            .test(
              'is-support-decimal',
              objectErrorMessage({
                key: errorTranslation,
                value: errorValue,
              }),
              (val: any) => DECIMAL_REGEX.test(val),
            );
        }),
        price: string().required('supply.product.price.error.required'),
        totalCost: string().required('supply.product.totalCost.error.required'),
      }).required(),
    )
    .required(),
  productsTotalCost: string().required(),
  productsTotalQuantity: string().required(),
});

export const useSupplyForm = ({
  shouldReset,
  submitHandler,
  defaultValues,
}: UseSupplyFormProps): UseSupplyFormReturn => {
  const { control, setValue, getValues, handleSubmit } =
    useCustomForm<SupplyFormValues>({
      formProps: {
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
      },
      shouldReset,
      submitHandler,
    });

  return {
    control,
    setValue,
    getValues,
    handleSubmit,
  };
};
