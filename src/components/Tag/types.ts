import { PropsWithChildren } from 'react';

import { TAG_VARIANT } from './constants';

export type TagProps = PropsWithChildren<{
  variant?: ValuesOfObject<typeof TAG_VARIANT>;
}>;
