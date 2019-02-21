export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(min, value), max);
};

export const scale = (
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number,
  isClamped = true
) => {
  const clampV = isClamped ? clamp(value, fromLow, fromHigh) : value;
  return ((clampV - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow;
};
