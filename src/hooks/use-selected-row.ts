'use client';

import * as React from 'react';

export type UseSelectedRowReturn<T> = {
  row: T | null;
  setRow: React.Dispatch<React.SetStateAction<T | null>>;
  reset: () => void;
};

export function useSelectedRow<T>(): UseSelectedRowReturn<T> {
  const [row, setRow] = React.useState<T | null>(null);

  const reset = React.useCallback(() => setRow(null), []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <all the dependencies are correct>
  return React.useMemo(() => ({ row, setRow, reset }), [row, setRow, reset]);
}
