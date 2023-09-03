import { PropsWithChildren } from 'react';

import { ElementSize } from '../../common/types/size';

export type LabelProps = PropsWithChildren<{
  size?: ElementSize;
  labelId?: string;
  htmlFor?: string;
  labelClassName?: string;
}>;
