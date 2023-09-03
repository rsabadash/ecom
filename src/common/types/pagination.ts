export type PaginationData<D> = {
  data: D[];
  metadata: {
    total: number;
  };
};
