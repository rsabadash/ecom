import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../../common/hooks/useCustomForm';
import { useCustomForm } from '../../../../common/hooks';
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

const schema = yup
  .object()
  .shape<YupSchemaKey<WarehouseProductsGeneratorProductsFormValues>>({
    products: yup.array().of(
      yup.object().shape<YupSchemaKey<GeneratedProductFieldValue>>({
        name: yup
          .object()
          .shape(
            mainTranslationRequired({
              uk: 'warehouseProduct.generatedName.error.required',
            }),
          )
          .required(),
        sku: yup
          .string()
          .nullable()
          .required('warehouseProduct.sku.error.required'),
      }),
    ),
  });

export const useWarehouseProductsGeneratorProductsForm = ({
  shouldReset,
  submitHandler,
  defaultValues,
}: UseWarehouseProductsGeneratorProductsFromProps): UseWarehouseProductsGeneratorProductsFromReturn => {
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
