export type DropdownItemId = string;

export type DropdownItemValue = string;

export type DropdownItemObject<V extends string = DropdownItemValue, I extends string = DropdownItemId> = {
    id: I;
    value: V;
};

export type DropdownItemPrimitive = DropdownItemValue;

export type DropdownItem = DropdownItemObject | DropdownItemPrimitive;

export type DropdownValue = null | DropdownItem | DropdownItem[];

export type DropdownProps = {
    name: string;
    value?: DropdownValue;
    items: DropdownItem[] | undefined;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    open?: boolean;
    invalid?: boolean;
    multiselect?: boolean;
    sendValue?: boolean;
    onBlur?: () => void;
    onChange: (value: DropdownValue) => void;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    ariaDescribedBy?: string;
};