import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../../hooks/useCustomForm';
import { useCustomForm } from '../../../../hooks';
import {
  GeneratedProductFieldValue,
  WarehouseProductsGeneratorProductsFormValues,
} from '../types';
import { mainTranslationRequired } from '../../../../validations/translations';

type UseWarehouseProductsGeneratorProductsFromProps = Pick<
  UseCustomFormProps<WarehouseProductsGeneratorProductsFormValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: Partial<WarehouseProductsGeneratorProductsFormValues>;
};

type UseWarehouseProductsGeneratorProductsFromReturn = Pick<
  UseCustomFormReturn<WarehouseProductsGeneratorProductsFormValues>,
  'control' | 'setValue' | 'clearErrors' | 'handleSubmit'
>;

type UseWarehouseProductsGeneratorProductsForm = (
  props: UseWarehouseProductsGeneratorProductsFromProps,
) => UseWarehouseProductsGeneratorProductsFromReturn;

const schema = yup
  .object()
  .shape<YupSchemaKey<WarehouseProductsGeneratorProductsFormValues>>({
    products: yup.array().of(
      yup.object().shape<YupSchemaKey<GeneratedProductFieldValue>>({
        name: yup
          .object()
          .shape(
            mainTranslationRequired({
              uk: 'warehouseProducts.generatedName.error.required',
            }),
          )
          .required(),
        sku: yup
          .string()
          .nullable()
          .required('warehouseProducts.sku.error.required'),
      }),
    ),
  });

export const useWarehouseProductsGeneratorProductsForm: UseWarehouseProductsGeneratorProductsForm =
  ({ shouldReset, submitHandler, defaultValues }) => {
    const { control, setValue, handleSubmit, clearErrors } =
      useCustomForm<WarehouseProductsGeneratorProductsFormValues>({
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
