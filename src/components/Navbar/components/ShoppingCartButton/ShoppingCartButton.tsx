"use client";
import {useRouter} from "next/navigation";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import {useGetCart} from "@/app/hooks/services/cart";
import {useCookies} from "react-cookie";


export default function ShoppingCartButton() {
  const [{token}, _, removeCookie] = useCookies(['token']);
  const {data, isError,} = useGetCart({
    enabled: !!token,
  });

  const cart = data?.data ?? [];

  const router = useRouter();

  const length = isError || !token ? 0 : cart?.length;

  return (
    <Badge badgeContent={length} color="primary">
      <ShoppingCartIcon
        sx={{color: "#000", cursor: "pointer"}}
        onClick={() => router.push("/checkout")}
      />
    </Badge>
  );
}
