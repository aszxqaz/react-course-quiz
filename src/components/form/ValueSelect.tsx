import { Select, SelectProps } from '@mantine/core';
import { useCallback, useMemo } from 'react';
import { Nullable, ValueChanged } from '../../types';

type ValueSelectProps<T> = {
  value: T;
  values: { value: T; label: string }[];
  defaultValue?: T;
  onChange?: ValueChanged<Nullable<T>>;
} & Omit<SelectProps, 'onChange' | 'value' | 'defaultValue'>;

export function ValueSelect<T>({
  value,
  values,
  defaultValue,
  onChange,
  ...selectProps
}: ValueSelectProps<T>) {
  const labels = useMemo(() => values.map(({ label }) => label), [values]);

  const defaultLabel = useMemo(
    () => values.find(({ value }) => value === defaultValue)?.label ?? null,
    [defaultValue],
  );

  const onLabelChange = useCallback(
    (label_: Nullable<string>) => {
      if (label_ === null) {
        onChange?.(null);
      } else {
        const value = values.find(({ label }) => label == label_)?.value;
        onChange?.(value ?? null);
      }
    },
    [values, onChange],
  );

  const label = useMemo(
    () => values.find(({ value: value_ }) => value_ === value)?.label ?? null,
    [value],
  );

  return (
    <Select
      data={labels}
      value={label}
      defaultValue={defaultLabel}
      onChange={onLabelChange}
      {...selectProps}
    />
  );
}
