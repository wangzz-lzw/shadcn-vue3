export interface Column {
  taskId: string;
  taskName: string;
  status?: string;
  index?: number;
  children?: Column[];
}
