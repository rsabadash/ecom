import { lazy, object } from 'yup';

// if object has dynamic key
// {
//   [key: string]: {
//     name: string;
//   }
// }
export const dynamicObject = <T>(rule: T) => {
  return lazy((map) => {
    const value = map || {};

    return object(
      Object.keys(value).reduce<Record<string, T>>(
        (newValue, key) => ({ ...newValue, [key]: rule }),
        {},
      ) as any,
    );
  });
};
