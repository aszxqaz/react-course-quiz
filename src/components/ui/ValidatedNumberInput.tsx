import { ActionIcon, Group, TextInput, TextInputProps } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { isInRange } from '../../helpers';
import { Nullable, ValueChanged } from '../../types';

type ValidatedNumberInputProps = {
  value?: Nullable<number>;
  onChange?: ValueChanged<Nullable<number>>;
  min: number;
  max: number;
} & Omit<TextInputProps, 'onChange' | 'value'>;

export function ValidatedNumberInput({
  value,
  min,
  max,
  onChange,
  ...numberInputProps
}: ValidatedNumberInputProps) {
  const [valueInner, setValueInner] = useState<string>(value?.toString() ?? min.toString());
  const [error, setError] = useState('');
  const onChangeInner = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === '') {
        console.log('here');
        setValueInner('');
        onChange?.(null);
        return;
      }
      if (/^\d+$/.test(value)) {
        const num = Number(value);
        setValueInner(value);
        onChange?.(num);

        if (!isInRange(num, min, max)) {
          setError(`Value not in range`);
        } else if (error) {
          setError('');
        }
      }
    },
    [min, max, onChange],
  );

  useEffect(() => {
    setValueInner(value?.toString() ?? '');
  }, [value]);

  const incrementDisabled = (value ?? Number.MAX_SAFE_INTEGER) >= max;
  const decrementDisabled = (value ?? Number.MIN_SAFE_INTEGER) <= min;

  const increment = useCallback(() => {
    if (!incrementDisabled && value) {
      onChange?.(value + 1);
      setValueInner((value + 1).toString());
    }
  }, [incrementDisabled, value]);

  const decrement = useCallback(() => {
    if (!decrementDisabled && value) {
      onChange?.(value - 1);
      setValueInner((value - 1).toString());
    }
  }, [decrementDisabled, value]);

  return (
    <Group>
      <TextInput
        flex={1}
        leftSection={
          <ActionIcon variant="transparent" disabled={decrementDisabled} onClick={decrement}>
            <IconMinus />
          </ActionIcon>
        }
        rightSection={
          <ActionIcon variant="transparent" disabled={incrementDisabled} onClick={increment}>
            <IconPlus />
          </ActionIcon>
        }
        error={error}
        value={valueInner}
        onChange={onChangeInner}
        {...numberInputProps}
      />
    </Group>
  );
}
