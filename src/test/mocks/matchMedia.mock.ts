type PredefinedMediaArgs = {
    query: string;
};

export const matchMediaMock = () => (predefinedMedia: PredefinedMediaArgs) => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
            matches: query === predefinedMedia.query,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })
    });
};