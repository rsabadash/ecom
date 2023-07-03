import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SupplierFormValues } from '../types';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../common/hooks/useCustomForm';
import { useCustomForm } from '../../../common/hooks';
import { supplierFormFields } from '../constants';

type UseSupplierFormProps = Pick<
  UseCustomFormProps<SupplierFormValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: Partial<SupplierFormValues>;
};

type UseSupplierFormReturn = Pick<
  UseCustomFormReturn<SupplierFormValues>,
  'control' | 'handleSubmit'
>;

const schema = yup.object().shape<YupSchemaKey<SupplierFormValues>>({
  [supplierFormFields.name]: yup
    .string()
    .nullable()
    .required('supplier.name.error.required'),
});

export const useSupplierForm = ({
  shouldReset,
  submitHandler,
  defaultValues,
}: UseSupplierFormProps): UseSupplierFormReturn => {
  const { control, handleSubmit } = useCustomForm<SupplierFormValues>({
    formProps: {
      resolver: yupResolver(schema),
      defaultValues: defaultValues,
    },
    shouldReset,
    submitHandler,
  });

  return {
    control,
    handleSubmit,
  };
};
