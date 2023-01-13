import { Context, createContext, Provider, useContext } from 'react';

export type CreateProviderOptions<ContextType> = {
    strict?: boolean;
    errorMessage?: string;
    contextName?: string;
    contextDefaultValue?: ContextType;
}

type CreateProviderReturn<T> = [Provider<T>, () => T, Context<T>];

export const createProvider = <ContextType>(options: CreateProviderOptions<ContextType> = {}) => {
    const {
        strict = true,
        errorMessage = 'Seems you forgot to wrap component within the Provider',
        contextName,
        contextDefaultValue = null
    } = options;

    const Context = createContext<ContextType | null>(contextDefaultValue);

    Context.displayName = contextName;

    const useProvider = () => {
        const context = useContext(Context);

        if (strict && context === null) {
            const error = new Error(errorMessage);
            error.name = 'ProviderError';
            Error.captureStackTrace?.(error, useProvider);
            throw error;
        }

        return context;
    };

    return [
        Context.Provider,
        useProvider,
        Context,
    ] as CreateProviderReturn<ContextType>;
};