export interface IGridItem {
  [string]?: string | string[];
}

export interface IGridAction {
  label: string;
  onClick: (row) => void;
}

export interface IGrid {
  data: IGridItem[];
  pageSize: number;
  actions?: IGridAction[];
  tableStyles?: stirng;
}
