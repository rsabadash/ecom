import { descriptionType } from './constatns';

export type DescriptionType = ValuesOfObject<typeof descriptionType>

export type DescriptionProps = {
    id?: string;
    type?: DescriptionType;
    message: string;
    descriptionClassName?: string;
};