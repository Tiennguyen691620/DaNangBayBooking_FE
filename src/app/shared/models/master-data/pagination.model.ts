
export class PaginationModel<T>{
  pageIndex!: number;
  pageSize!: number;
  pageCount!: number;
  totalRecords!: number;
  items!: T[];
}