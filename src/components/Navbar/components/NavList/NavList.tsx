import Link from "next/link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import navLinks from "../../navLinks";
import { SxProps } from "@mui/system";
import { useUserContext } from "@/context";
import { RoleEnum } from "@/interfaces";
import { CurrencyExchange } from "@mui/icons-material";
import { useCookies } from "react-cookie";

export default function NavbarList(sx: SxProps = {}) {
  const { user } = useUserContext();

  const [cookies] = useCookies();
  return (
    <>
      {!!cookies.token && user?.role === RoleEnum.ADMIN && (
        <Box>
          <Link href={"/receipt"}>
            <Button variant="text" color="success" sx={{ fontWeight: 500 }}>
              <CurrencyExchange sx={{ marginRight: 1 }} />
              Receipt
            </Button>
          </Link>
        </Box>
      )}

      {navLinks.map(({ route, title }, index) => {
        return (
          <Box key={`nav-list-${index}`} sx={sx}>
            <Link
              shallow={route !== "/available-works"}
              key={`navbar-item-${index}`}
              href={route}
            >
              <Button
                variant="text"
                className="navbar-btn"
                sx={{ fontWeight: 500 }}
              >
                {title}
              </Button>
            </Link>
          </Box>
        );
      })}
    </>
  );
}
