'use client';

import * as React from 'react';

type TabConfig<T extends Record<string, string>> = {
  tabs: Readonly<T>;
  defaultTab: T[keyof T];
};

type UseTabsReturn<T extends Record<string, string>> = {
  value: T[keyof T];
  setValue: React.Dispatch<React.SetStateAction<T[keyof T]>>;
  tabList: T;
  onValueChange: (value: string) => void;
};

export function useTabs<T extends Record<string, string>>({
  tabs,
  defaultTab,
}: TabConfig<T>): UseTabsReturn<T> {
  const [value, setValue] = React.useState<T[keyof T]>(defaultTab);

  const onValueChange = (v: string) => {
    setValue(v as T[keyof T]);
  };

  return { value, setValue, tabList: tabs, onValueChange };
}
