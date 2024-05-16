import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, object, ObjectSchema, string } from 'yup';

import { URL_SLUG } from '../../../../../common/constants/regex';
import { useCustomForm } from '../../../../../common/hooks';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
} from '../../../../../common/hooks/useCustomForm';
import { AttributeFormDefaultValues, AttributeFormValues } from '../types';

type UseAttributeFromProps = Pick<
  UseCustomFormProps<AttributeFormValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: AttributeFormDefaultValues;
};

type UseAttributeFromReturn = Pick<
  UseCustomFormReturn<AttributeFormValues>,
  'control' | 'handleSubmit'
>;

const schema: ObjectSchema<AttributeFormValues> = object({
  name: string().required('attribute.name.error.required'),
  seoName: string()
    .matches(URL_SLUG, 'attribute.seoName.error.symbol')
    .required('attribute.seoName.error.required'),
  isActive: boolean().required(),
});

export const useAttributeForm = ({
  shouldReset,
  submitHandler,
  defaultValues,
}: UseAttributeFromProps): UseAttributeFromReturn => {
  const { control, handleSubmit } = useCustomForm<AttributeFormValues>({
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
