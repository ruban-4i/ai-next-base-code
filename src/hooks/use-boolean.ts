'use client';

import * as React from 'react';

export type UseBooleanReturn = {
  value: boolean;
  onTrue: () => void;
  onFalse: () => void;
  onToggle: () => void;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useBoolean(defaultValue = false): UseBooleanReturn {
  const [value, setValue] = React.useState(defaultValue);

  const onTrue = React.useCallback(() => {
    setValue(true);
  }, []);

  const onFalse = React.useCallback(() => {
    setValue(false);
  }, []);

  const onToggle = React.useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <all the dependencies are correct>
  const memoizedValue = React.useMemo(
    () => ({
      value,
      onTrue,
      onFalse,
      onToggle,
      setValue,
    }),
    [value, onTrue, onFalse, onToggle, setValue]
  );

  return memoizedValue;
}
