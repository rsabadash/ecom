import bigDecimal from 'js-big-decimal';

import { UNIT_CODE } from '../../../common/constants/units';
import { Unit } from '../../../common/types/unit';

export const parseToDecimal = (value: string): string => {
  const valueToParse = value.trim() ? value : '0';

  return Number.parseFloat(valueToParse).toFixed(2);
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

export const isUnitSupportDecimal = (unit: Unit) => {
  return unit !== UNIT_CODE.ITEM;
};
