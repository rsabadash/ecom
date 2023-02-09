import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SupplierFormValues } from '../types';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../hooks/useCustomForm';
import { useCustomForm } from '../../../hooks';
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

type UseSupplierForm = (props: UseSupplierFormProps) => UseSupplierFormReturn;

const schema = yup.object().shape<YupSchemaKey<SupplierFormValues>>({
  [supplierFormFields.name]: yup
    .string()
    .nullable()
    .required('suppliers.name.error.required')
    .min(3)
    .max(50),
  [supplierFormFields.note]: yup
    .string()
    .nullable()
    .max(1024, 'suppliers.name.error.max'),
  [supplierFormFields.phoneNumber]: yup
    .string()
    .nullable()
    .length(10, 'suppliers.phoneNumber.error.length'),
});

export const useSupplierForm: UseSupplierForm = ({
  shouldReset,
  submitHandler,
  defaultValues,
}) => {
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
