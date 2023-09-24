import { Attribute } from '../common/types';

export type AttributePostData = Omit<Attribute, '_id' | 'variants'>;

export type AttributePostResponse = Attribute;
