import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../../hooks/useCustomForm';
import { useCustomForm } from '../../../../hooks';
import { WarehouseProductsGeneratorProductsFromValues } from '../types';
import { mainTranslationRequired } from '../../../../validations/translations';

type UseWarehouseProductsGeneratorProductsFromProps = Pick<
  UseCustomFormProps<WarehouseProductsGeneratorProductsFromValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: Partial<WarehouseProductsGeneratorProductsFromValues>;
};

type UseWarehouseProductsGeneratorProductsFromReturn = Pick<
  UseCustomFormReturn<WarehouseProductsGeneratorProductsFromValues>,
  'control' | 'setValue' | 'clearErrors' | 'handleSubmit'
>;

type UseWarehouseProductsGeneratorProductsForm = (
  props: UseWarehouseProductsGeneratorProductsFromProps,
) => UseWarehouseProductsGeneratorProductsFromReturn;

const schema = yup
  .object()
  .shape<YupSchemaKey<WarehouseProductsGeneratorProductsFromValues>>({
    product: yup.array().of(
      yup.object().shape({
        name: yup
          .object()
          .shape(
            mainTranslationRequired({
              uk: 'warehouseProducts.generatedName.error.required',
            }),
          )
          .required(),
        sku: yup.string().required('warehouseProducts.sku.error.required'),
      }),
    ),
  });

export const useWarehouseProductsGeneratorProductsForm: UseWarehouseProductsGeneratorProductsForm =
  ({ shouldReset, submitHandler, defaultValues }) => {
    const { control, setValue, handleSubmit, clearErrors } =
      useCustomForm<WarehouseProductsGeneratorProductsFromValues>({
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
      clearErrors,
      handleSubmit,
    };
  };
