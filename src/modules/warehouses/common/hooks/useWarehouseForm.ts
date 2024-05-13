import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { object, ObjectSchema, string } from 'yup';

import { useCustomForm } from '../../../../common/hooks';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
} from '../../../../common/hooks/useCustomForm';
import { dropdownItem } from '../../../../validations/schemas/dropdown';
import {
  WarehouseFormDefaultValues,
  WarehouseFormValues,
  WarehouseType,
} from '../types';

type UseWarehouseFormProps = Pick<
  UseCustomFormProps<WarehouseFormValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: WarehouseFormDefaultValues;
};

type UseWarehouseFormReturn = Pick<
  UseCustomFormReturn<WarehouseFormValues>,
  'control' | 'handleSubmit'
>;

const schema: ObjectSchema<WarehouseFormValues> = object({
  name: string().required('warehouse.name.error.required'),
  type: object({
    ...dropdownItem,
    id: string<WarehouseType>().required(),
  }).required('warehouse.type.error.required'),
  address: string().required().nullable(),
});

export const useWarehouseForm = ({
  shouldReset,
  submitHandler,
  defaultValues,
}: UseWarehouseFormProps): UseWarehouseFormReturn => {
  const { control, handleSubmit } = useCustomForm<WarehouseFormValues>({
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
