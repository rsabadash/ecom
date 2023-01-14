import { LocalStorageService } from '../services';
import {
  DEFAULT_LANGUAGE,
  Language,
  LOCALE_STORAGE_KEY,
} from '../components/IntlProvider';

const HOST = 'http://localhost:3001';

type CommonOptions = {
  url: string;
};

export type GetAction = <R>(options: CommonOptions) => Promise<R>;

export const GET: GetAction = async <R>(options: CommonOptions): Promise<R> => {
  const response = await fetch(`${HOST}${options.url}`, {
    method: 'GET',
    headers: {
      'Accept-Language':
        LocalStorageService.getItem<Language>(LOCALE_STORAGE_KEY) ||
        DEFAULT_LANGUAGE,
    },
  });

  if (response.ok) {
    return (await response.json()) as Promise<R>;
  } else {
    throw new Error(String(response.status));
  }
};

type PostOptions<D> = CommonOptions & {
  data: D;
};

export type PostAction = <R, D = Record<string, unknown>>(
  options: PostOptions<D>,
) => Promise<R>;

export const POST: PostAction = async <R, D = Record<string, unknown>>(
  options: PostOptions<D>,
): Promise<R> => {
  const response = await fetch(`${HOST}${options.url}`, {
    method: 'POST',
    headers: {
      'Accept-Language':
        LocalStorageService.getItem<Language>(LOCALE_STORAGE_KEY) ||
        DEFAULT_LANGUAGE,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.data),
  });

  if (response.ok) {
    return (await response.json()) as Promise<R>;
  } else {
    throw new Error(String(response.status));
  }
};

type PatchOptions<D> = CommonOptions & {
  data: D;
};

export type PatchAction = <R, D = Record<string, unknown>>(
  options: PatchOptions<D>,
) => Promise<R>;

export const PATCH: PatchAction = async <R, D = Record<string, unknown>>(
  options: PatchOptions<D>,
): Promise<R> => {
  const response = await fetch(`${HOST}${options.url}`, {
    method: 'PATCH',
    headers: {
      'Accept-Language':
        LocalStorageService.getItem<Language>(LOCALE_STORAGE_KEY) ||
        DEFAULT_LANGUAGE,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.data),
  });

  if (response.ok) {
    return (await response.json()) as Promise<R>;
  } else {
    throw new Error(String(response.status));
  }
};

type DeleteOptions<D> = CommonOptions & {
  data: D;
};
export type DeleteAction = <R, D = Record<string, unknown>>(
  options: DeleteOptions<D>,
) => Promise<R>;

export const DELETE: PostAction = async <R, D = Record<string, unknown>>(
  options: DeleteOptions<D>,
): Promise<R> => {
  const response = await fetch(`${HOST}${options.url}`, {
    method: 'DELETE',
    headers: {
      'Accept-Language':
        LocalStorageService.getItem<Language>(LOCALE_STORAGE_KEY) ||
        DEFAULT_LANGUAGE,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.data),
  });

  if (response.ok) {
    return (await response.json()) as Promise<R>;
  } else {
    throw new Error(String(response.status));
  }
};

export type WrapPromiseResult<R> = { read(): R | undefined };

export const wrapPromise = <R>(promise: Promise<R>): WrapPromiseResult<R> => {
  let status = 'pending';
  let result: R | Error;
  const suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    },
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        // eslint-disable-next-line no-throw-literal
        throw result as Error;
      } else if (status === 'success') {
        return result as R;
      }
    },
  };
};
