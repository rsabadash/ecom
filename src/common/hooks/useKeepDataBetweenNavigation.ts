import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { useCustomNavigate } from './useCustomNavigate';

type NavigateWithDataArgs<D> = {
  to: string;
  data: D;
};

type UseKeepDataBetweenNavigationReturn = {
  navigateWithData: <D>(args: NavigateWithDataArgs<D>) => Promise<void>;
  getNavigationStateData: <S>() => NonNullable<S> | undefined;
};

export const useKeepDataBetweenNavigation =
  (): UseKeepDataBetweenNavigationReturn => {
    const { state } = useLocation();
    const navigate = useCustomNavigate();

    const navigateWithData = useCallback(
      async <D>({ data, to }: NavigateWithDataArgs<D>): Promise<void> => {
        await navigate(to, {
          state: data,
        });
      },
      [navigate],
    );

    const getNavigationStateData = useCallback(<S>():
      | NonNullable<S>
      | undefined => {
      return (state as S) || undefined;
    }, [state]);

    return {
      navigateWithData,
      getNavigationStateData,
    };
  };
