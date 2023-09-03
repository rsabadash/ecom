import { UNIT_CODE } from '../../../common/constants/units';
import { Unit } from '../../../common/types/unit';
import { calculation } from '../../../common/utils';

export const calculateSummary = <T>(
  prev: T | null,
  current: T | null,
  summary: T,
): string => {
  if (prev !== current) {
    let intermediateResult = String(summary);

    if (prev) {
      intermediateResult = calculation.subtract(summary, prev);
    }

    return calculation.add(intermediateResult, current);
  }

  return String(summary);
};

export const isUnitSupportDecimal = (unit: Unit): boolean => {
  return unit !== UNIT_CODE.ITEM;
};
