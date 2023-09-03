import { ICalculationService } from '../services/calculationService';
import { calculation } from '../utils';

type UseCalculationReturn = ICalculationService;

export const useCalculation = (): UseCalculationReturn => {
  return calculation;
};
