import { FormEventHandler, PropsWithChildren } from 'react';

export type FormProps = PropsWithChildren<{
  onSubmit: FormEventHandler;
}>;
