interface TableItem {
  _id: string;
  image: string;
  title: string;
  measurements: string;
  price: number;
}

export type CheckoutTableProps = {
  data: TableItem[],
  hideHeader?: boolean;
  onRemove?: (index: string) => void;
  loading?: boolean;
}
