import bigDecimal from 'js-big-decimal';

const DEFAULT_PRECISION = 2;

export interface ICalculationService {
  add(n1: any, n2: any): string;
  subtract(n1: any, n2: any): string;
  multiply(n1: any, n2: any): string;
  divide(n1: any, n2: any, precision?: number): string;
  round(number: any, precision?: number): string;
}

export class CalculationService implements ICalculationService {
  add(n1: any, n2: any): string {
    return bigDecimal.add(n1, n2);
  }

  subtract(n1: any, n2: any): string {
    return bigDecimal.subtract(n1, n2);
  }

  multiply(n1: any, n2: any): string {
    return bigDecimal.multiply(n1, n2);
  }

  divide(n1: any, n2: any, precision: number = DEFAULT_PRECISION): string {
    return bigDecimal.divide(n1, n2, precision);
  }

  round(number: any, precision: number = DEFAULT_PRECISION): string {
    return bigDecimal.round(number, precision);
  }
}
