import { useRef } from 'react';

type UsePreviousPersistentValue = string | number | null | undefined;

type UsePreviousPersistentRef = {
  value: UsePreviousPersistentValue;
  prev: UsePreviousPersistentValue;
};

export const usePreviousPersistent = (
  value: UsePreviousPersistentValue,
): UsePreviousPersistentValue => {
  // Initialise the ref with previous and current values
  const ref = useRef<UsePreviousPersistentRef>({
    value: value,
    prev: null,
  });

  const current = ref.current.value;

  // If the value passed into hook doesn't match what we store as "current"
  // move the "current" to the "previous"
  // and store the passed value as "current"
  if (value !== current) {
    ref.current = {
      value: value,
      prev: current,
    };
  }

  // Return the previous value only
  return ref.current.prev;
};
