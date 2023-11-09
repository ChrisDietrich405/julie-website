export interface ICartItem {
  id: number;
  price: number;
  image: string;
}

export interface ICartContext {
  cart: ICartItem[];
  setCart: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}
