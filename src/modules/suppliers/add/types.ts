import { Supplier } from '../common/types';

export type SupplierPostData = Omit<Supplier, '_id'>;

export type SupplierPostResponse = Supplier;
