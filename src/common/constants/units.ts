export const UNIT_CODE = {
  METER: 'm',
  CENTIMETRE: 'cm',
  MILLIMETRE: 'mm',
  LITER: 'l',
  MILLILITER: 'ml',
  KILOGRAM: 'kg',
  GRAM: 'g',
  MILLIGRAM: 'mg',
  PIECES: 'pcs',
} as const;

export const UNITS_LIST = Object.values(UNIT_CODE);
