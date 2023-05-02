export type ObjectErrorMessageProps = {
  translationKey: string;
  placeholderValue: string | number;
};

export const objectErrorMessage = ({
  translationKey,
  placeholderValue,
}: ObjectErrorMessageProps) => ({
  translationKey,
  placeholderValue,
});
