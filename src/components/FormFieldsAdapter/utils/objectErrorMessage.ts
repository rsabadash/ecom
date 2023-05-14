type ObjectErrorMessageProps = {
  key: string;
  value: string | number;
};

export type ObjectErrorMessageReturn = {
  translationKey: string;
  placeholderValue: string | number;
};

export const objectErrorMessage = ({
  key,
  value,
}: ObjectErrorMessageProps): ObjectErrorMessageReturn => ({
  translationKey: key,
  placeholderValue: value,
});
