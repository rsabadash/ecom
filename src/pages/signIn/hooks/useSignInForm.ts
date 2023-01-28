import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseCustomFormProps,
  UseCustomFormReturn,
  YupSchemaKey,
} from '../../../hooks/useCustomForm';
import { useCustomForm } from '../../../hooks';
import { SignInFormValues } from '../types';

type UseCategoryFromProps = Pick<
  UseCustomFormProps<SignInFormValues>,
  'submitHandler'
>;

type UseCategoryFromReturn = Pick<
  UseCustomFormReturn<SignInFormValues>,
  'control' | 'handleSubmit'
>;

type UseCategoryForm = (props: UseCategoryFromProps) => UseCategoryFromReturn;

const schema = yup.object().shape<YupSchemaKey<SignInFormValues>>({
  email: yup
    .string()
    .email('signIn.email.invalid')
    .required('signIn.email.required'),
  password: yup.string().required('signIn.password.required'),
});

export const useSignInForm: UseCategoryForm = ({ submitHandler }) => {
  const { control, handleSubmit } = useCustomForm<SignInFormValues>({
    formProps: {
      resolver: yupResolver(schema),
    },
    submitHandler,
  });

  return {
    control,
    handleSubmit,
  };
};
