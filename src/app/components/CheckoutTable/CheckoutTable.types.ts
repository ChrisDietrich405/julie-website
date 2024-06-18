interface TableItem {
  _id: string;
  image: string;
  title: string;
  measurements: string;
  price: number;
}

export type CheckoutTableProps = {
  data: TableItem[],
  onRemove: (index: string) => void;
  loading?: boolean;
}
