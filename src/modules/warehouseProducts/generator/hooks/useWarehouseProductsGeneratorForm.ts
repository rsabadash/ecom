import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { UNITS_LIST } from '../../../../common/constants/units';
import { useCustomForm } from '../../../../common/hooks';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../../common/hooks/useCustomForm';
import { mainTranslationRequired } from '../../../../validations/translations';
import { WarehouseProductsGeneratorFormValues } from '../types';

type UseWarehouseProductsGeneratorFromProps = Pick<
  UseCustomFormProps<WarehouseProductsGeneratorFormValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: Partial<WarehouseProductsGeneratorFormValues>;
};

type UseWarehouseProductsGeneratorFromReturn = Pick<
  UseCustomFormReturn<WarehouseProductsGeneratorFormValues>,
  'control' | 'setValue' | 'getValues' | 'handleSubmit'
>;

const schema = yup
  .object()
  .shape<YupSchemaKey<WarehouseProductsGeneratorFormValues>>({
    name: yup
      .object()
      .shape(
        mainTranslationRequired({
          uk: 'warehouseProduct.name.error.required',
        }),
      )
      .required(),
    unit: yup
      .string()
      .nullable()
      .oneOf(UNITS_LIST, 'error.dropdown.unsupportedValue')
      .required('warehouseProduct.unit.error.required'),
  });

export const useWarehouseProductsGeneratorForm = ({
  shouldReset,
  submitHandler,
  defaultValues,
}: UseWarehouseProductsGeneratorFromProps): UseWarehouseProductsGeneratorFromReturn => {
  const { control, handleSubmit, setValue, getValues } =
    useCustomForm<WarehouseProductsGeneratorFormValues>({
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
