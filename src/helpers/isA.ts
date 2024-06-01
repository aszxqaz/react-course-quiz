export function isA<T>(value: any, values: readonly T[]): value is T {
  return values.includes(value);
}
