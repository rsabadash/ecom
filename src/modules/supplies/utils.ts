import bigDecimal from 'js-big-decimal';

export const parseToDecimal = (value: string): string => {
  return Number.parseFloat(value).toFixed(2);
};

export const calculateSummary = <T>(
  prev: T | null,
  current: T | null,
  summary: T,
): string => {
  if (prev !== current) {
    let intermediateResult = String(summary);

    if (prev) {
      intermediateResult = bigDecimal.subtract(summary, prev);
    }

    return bigDecimal.add(intermediateResult, current);
  }

  return String(summary);
};
