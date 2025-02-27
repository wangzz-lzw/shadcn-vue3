export interface Column {
  taskId: string;
  taskName: string;
  status?: string;
  children?: Column[];
}
