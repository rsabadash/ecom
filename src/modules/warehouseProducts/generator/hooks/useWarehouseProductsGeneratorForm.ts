import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../../hooks/useCustomForm';
import { useCustomForm } from '../../../../hooks';
import { WarehouseProductsGeneratorFormValues } from '../types';
import { mainTranslationRequired } from '../../../../validations/translations';

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
          uk: 'warehouseProducts.name.error.required',
        }),
      )
      .required(),
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
