export type ApiError = {
  status?: number;
  message: string;
};

type ErrorResponse = {
  statusCode: number;
  message: string;
  error: string;
};

type FetchOptions = RequestInit;

export type CustomOptions = {
  onRetry?: (error: ApiError) => Promise<void> | void;
  onError?: (error: ApiError) => Promise<void> | void;
  retry?: number;
};

type Options = FetchOptions & CustomOptions;

type OptionsGet = Omit<Options, 'body'>;

type ActionOptions<D> = OptionsGet & {
  data: D;
};

type DefaultOptions = Options | (() => Options);

export type GetMethod = <R>(
  url: string,
  options?: OptionsGet,
) => Promise<R | undefined>;

export type ActionMethod = <R, D extends Record<string, any>>(
  url: string,
  options?: ActionOptions<D>,
) => Promise<R | undefined>;

export interface ApiServiceInterface {
  GET: GetMethod;
  POST: ActionMethod;
  PATCH: ActionMethod;
  DELETE: ActionMethod;
}

export class ApiService implements ApiServiceInterface {
  private readonly _host: string;
  private defaultOptions: DefaultOptions;
  constructor(host: string) {
    this._host = host;
    this.defaultOptions = {};
  }

  private isJsonContentType(response: Response): boolean {
    const contentType = response.headers.get('content-type');

    return contentType ? contentType.includes('application/json') : false;
  }

  private async parseResponse<R>(response: Response): Promise<R | undefined> {
    if (this.isJsonContentType(response)) {
      return (await response.json()) as Promise<R>;
    }

    return undefined;
  }

  private mergeOptions(methodOptions: Options): Options {
    const defaultConfig: Options =
      typeof this.defaultOptions === 'function'
        ? this.defaultOptions()
        : this.defaultOptions;

    return {
      ...defaultConfig,
      ...methodOptions,
      headers: {
        ...defaultConfig.headers,
        ...methodOptions.headers,
      },
    };
  }

  private async fetchWrapper<R>(
    url: string,
    options: Options = {},
  ): Promise<R | undefined> {
    const { retry } = this.mergeOptions(options);

    const fetcher = async (
      fetcherUrl: string,
      retries?: number,
    ): Promise<R | undefined> => {
      const { onError, onRetry, ...fetcherOptions } =
        this.mergeOptions(options);

      const response = await fetch(
        `${this._host}${fetcherUrl}`,
        fetcherOptions,
      );

      if (response.ok) {
        return this.parseResponse<R>(response);
      }

      const errorResponse = await this.parseResponse<ErrorResponse>(response);
      const errorMessage = errorResponse?.message || response.statusText;
      const errorStatus = errorResponse?.statusCode || response.status;

      const errorData: ApiError = {
        message: errorMessage,
        status: errorStatus,
      };

      if (retries && retries > 0) {
        if (onRetry) {
          await onRetry(errorData);
        }

        return fetcher(url, retries - 1);
      }

      if (onError) {
        onError(errorData);

        return;
      }

      const error: any = new Error(errorMessage);
      error.status = errorStatus;

      throw error;
    };

    return await fetcher(url, retry);
  }

  public GET = async <R>(
    url: string,
    options: OptionsGet = {},
  ): Promise<R | undefined> => {
    return await this.fetchWrapper(url, { ...options, method: 'GET' });
  };

  public POST = async <R, D extends Record<string, any>>(
    url: string,
    options?: ActionOptions<D>,
  ): Promise<R | undefined> => {
    return await this.fetchWrapper(url, {
      ...options,
      body: JSON.stringify(options?.data),
      method: 'POST',
    });
  };

  public PATCH = async <R, D extends Record<string, any>>(
    url: string,
    options?: ActionOptions<D>,
  ): Promise<R | undefined> => {
    return await this.fetchWrapper(url, {
      ...options,
      body: JSON.stringify(options?.data),
      method: 'PATCH',
    });
  };

  public DELETE = async <R, D extends Record<string, any>>(
    url: string,
    options?: ActionOptions<D>,
  ): Promise<R | undefined> => {
    return await this.fetchWrapper(url, {
      ...options,
      body: JSON.stringify(options?.data),
      method: 'DELETE',
    });
  };

  public setConfig = (options: DefaultOptions): void => {
    this.defaultOptions = options;
  };
}
