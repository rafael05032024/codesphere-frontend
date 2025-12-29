export interface IRow {
  [column: string]: {
    customClass?: string;
    data: unknown;
  };
}
