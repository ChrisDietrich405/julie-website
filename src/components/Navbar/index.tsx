"use client";
import {useRouter} from "next/navigation";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {useGetCart} from "@/app/hooks/services/cart";
import {useCookies} from "react-cookie";

const navLinks = [
  {
    title: "Home",
    route: "/",
  },
  {
    title: "About",
    route: "/about",
  },
  {
    title: "Portfolio",
    route: "/portfolio",
  },
  {
    title: "Available Works",
    route: "/available-works",
  },
  {
    title: "Contact",
    route: "/contact",
  },
];

const navLinksFunction = (isLoggedIn: boolean) => [
  ...navLinks,
  {
    title: isLoggedIn ? "Log out" : "Log in",
    route: isLoggedIn ? "/" : "/login",
  },
];

export default function  Navbar() {
  const [cookies, _, removeCookie] = useCookies(['token']);

  const {data, isError} = useGetCart({ refetchInterval: 10000 });

  const cart = data?.data ?? [];

  const router = useRouter();

  const appBarStyle = {
    backgroundColor: "white",
  };

  const length = isError ? 0 : cart?.length;

  const handleLogout = () => {
    removeCookie('token')
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar sx={{flexGrow: 1, backgroundColor: "#eeeff0"}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2, display: {sm: "block", md: "none"}}}
          >
            <MenuIcon/>
          </IconButton>

          <Box flexGrow={1}>
            <Button
              variant="text"
              component="h1"
              sx={{
                color: "black",
                width: 'auto',
                justifyContent: 'start',
                padding: 0,
                fontWeight: 500,
                fontSize: '1.25rem',
                lineHeight: 1.6,
                textTransform: 'capitalize'
              }}
              onClick={() => router.push('/')}
            >
              Julie Dietrich Art
            </Button>
          </Box>

          {navLinksFunction(!!cookies.token).map(({route, title}, index) => {
            return (
              <Link
                shallow={route !== '/available-works'}
                key={`navbar-item-${index}`}
                href={route}
                onClick={() => {
                  title === "Log out" ? handleLogout() : undefined;
                }}
              >
                <Button sx={{mx: 2}} variant="text" className="navbar-btn">
                  {title}
                </Button>
              </Link>
            );
          })}

          <Badge badgeContent={length} color="primary">
            <ShoppingCartIcon
              sx={{color: "#000", cursor: "pointer"}}
              onClick={() => router.push("/checkout")}
            />
          </Badge>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
