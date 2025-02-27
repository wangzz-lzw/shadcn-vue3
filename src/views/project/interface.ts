export interface Column {
  id: string;
  name: string;
  status?: string;
  children?: Column[];
}
