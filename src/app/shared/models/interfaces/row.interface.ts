export interface IRow {
  [column: string]: {
    customClass?: string;
    data: unknown;
    icon?: {
      url: string;
      width: number;
    };
  };
}
