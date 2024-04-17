export type ModuleDetailActionsProps = {
  onEdit: () => void;
  onDelete: () => Promise<void>;
  isReadOnly: boolean;
};
