import { ReactNode, useCallback } from 'react';
import { toast } from 'react-toastify';

type PromiseNotificationArgs<R> = {
  fetch: () => Promise<R>;
  pendingContent: string;
  successContent: string;
  errorContent: string;
};

export const useNotifications = () => {
  const successNotification = useCallback((content: ReactNode) => {
    return toast.success(content);
  }, []);

  const errorNotification = useCallback((content: ReactNode) => {
    return toast.error(content);
  }, []);

  const warningNotification = useCallback((content: ReactNode) => {
    return toast.warn(content);
  }, []);

  const promiseNotification = useCallback(
    <R>(args: PromiseNotificationArgs<R>) => {
      const { fetch, pendingContent, successContent, errorContent } = args;

      return toast.promise(
        fetch,
        {
          pending: pendingContent,
          success: successContent,
          error: errorContent,
        },
        { icon: true },
      );
    },
    [],
  );

  return {
    successNotification,
    errorNotification,
    warningNotification,
    promiseNotification,
  };
};
