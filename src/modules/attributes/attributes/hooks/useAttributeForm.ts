import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { URL_SLUG } from '../../../../common/constants/regex';
import { useCustomForm } from '../../../../common/hooks';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../../common/hooks/useCustomForm';
import { mainTranslationRequired } from '../../../../validations/translations';
import { AttributeFormValues } from '../types';

type UseAttributeFromProps = Pick<
  UseCustomFormProps<AttributeFormValues>,
  'shouldReset' | 'submitHandler'
> & {
  defaultValues?: Partial<AttributeFormValues>;
};

type UseAttributeFromReturn = Pick<
  UseCustomFormReturn<AttributeFormValues>,
  'control' | 'handleSubmit'
>;

const schema = yup.object().shape<YupSchemaKey<AttributeFormValues>>({
  name: yup
    .object()
    .shape(
      mainTranslationRequired({
        uk: 'attribute.name.error.required',
      }),
    )
    .required(),
  seoName: yup
    .string()
    .nullable()
    .matches(URL_SLUG, 'attribute.seoName.error.symbol')
    .required('attribute.seoName.error.required'),
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
