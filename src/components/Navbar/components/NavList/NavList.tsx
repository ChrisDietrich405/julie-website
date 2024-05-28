import Link from "next/link";
import Button from "@mui/material/Button";
import navLinks from "../../navLinks";

export default function  NavbarList() {

  return (
    <>
    {navLinks.map(({route, title}, index) => {
      return (
        <Link
          shallow={route !== '/available-works'}
          key={`navbar-item-${index}`}
          href={route}
        >
          <Button variant="text" className="navbar-btn" sx={{fontWeight: 500}}>
            {title}
          </Button>
        </Link>
      );
    })}
    </>
  );
}
