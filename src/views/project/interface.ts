export interface Column {
  id: string;
  name: string;
  children?: Column[];
}
