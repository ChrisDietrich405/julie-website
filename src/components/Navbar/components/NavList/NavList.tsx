import Link from "next/link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import navLinks from "../../navLinks";

export default function NavbarList({ sx }) {
  return (
    <>
      {navLinks.map(({ route, title }, index) => {
        return (
          <Box sx={sx}>
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
