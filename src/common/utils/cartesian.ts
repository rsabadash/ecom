export const cartesian = <I, A, R>(
  handler: (initialValue: I | R, arg: A) => R,
  initial: I,
  ...args: A[][]
): R[] => {
  const result: R[] = [];
  const max = args.length - 1;

  const helper = (initialValue: I | R, i: number) => {
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
