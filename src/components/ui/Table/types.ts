import { ReactNode } from 'react';
import { TwStyle } from 'twin.macro';
import { IDType } from '~/store/types';

export type Column<T extends IDType> = {
  name: string;
  content?: (row: T) => ReactNode;
  sortableContent?: (row: T) => string | number;
  customHead?: ReactNode;
  cellCss?: TwStyle;
  hideSmallDevice?: boolean;
  descending?: boolean;
  sendDataProp?: boolean;
};

type ColumnsProp<T extends IDType> = {
  columns: Column<T>[];
};

export type TableProps<T extends IDType> = {
  data: T[];
  /** If callback is sent, sorted data is sent there and re-render is in charge of outside component.
      If not, re-render is done directly inside the Table (sorted data not available for outside component) */
  sortedCallback?: (sortedData: T[]) => void;
} & ColumnsProp<T>;

export type SortHeadProps<T extends IDType> = {
  sortColumn: string;
  onSort: (columnName: string) => void;
} & ColumnsProp<T>;
