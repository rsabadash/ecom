export const cartesian = <A, R>(
  handler: (initialValue: R, arg: A) => R,
  initial: any,
  ...args: A[][]
): R[] => {
  const result: R[] = [];
  const max = args.length - 1;

  const helper = (initialValue: R, i: number) => {
    for (let j = 0, l = args[i].length; j < l; j++) {
      const currentArg = args[i][j];

      const intermediateResult = handler(initialValue, currentArg);

      if (i === max) {
        result.push(intermediateResult);
      } else {
        helper(intermediateResult, i + 1);
      }
    }
  };

  helper(initial, 0);

  return result;
};
