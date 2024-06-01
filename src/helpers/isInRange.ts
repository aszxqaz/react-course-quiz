export function isInRange(n: number, min?: number, max?: number) {
  if (typeof min == 'undefined') {
    min = Number.MIN_SAFE_INTEGER;
  }
  if (typeof max == 'undefined') {
    max = Number.MAX_SAFE_INTEGER;
  }
  return n >= min && n <= max;
}
