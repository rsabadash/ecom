import { BaseSyntheticEvent, useCallback, useEffect } from 'react';
import {
  useForm,
  UseFormProps,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

export type UseCustomFormProps<V extends Record<string, any>> = {
  formProps: UseFormProps<V>;
  shouldReset?: boolean;
  submitHandler: SubmitHandler<V>;
};

export type UseCustomFormReturn<V extends Record<string, any>> = Omit<
  UseFormReturn<V>,
  'handleSubmit'
> & {
  handleSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
};

export const useCustomForm = <V extends Record<string, any>>({
  formProps,
  shouldReset,
  submitHandler,
}: UseCustomFormProps<V>): UseCustomFormReturn<V> => {
  const { formState, reset, handleSubmit, ...rest } = useForm<V>(formProps);

  const { isDirty, isSubmitted } = formState;

  const handleFormSubmit = useCallback(
    async (e?: BaseSyntheticEvent) => await handleSubmit(submitHandler)(e),
    [handleSubmit, submitHandler],
  );

  useEffect(() => {
    if (shouldReset) {
      if (isDirty && !isSubmitted) {
        reset();
      }
    }
  }, [reset, shouldReset, isSubmitted, isDirty]);

  return {
    ...rest,
    formState,
    reset,
    handleSubmit: handleFormSubmit,
  };
};
