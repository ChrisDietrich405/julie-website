import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {NavList, ShoppingCartButton, UserMenu} from "@/components/Navbar/components";

export default function Navbar() {
  const appBarStyle = {
    backgroundColor: "white",
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar sx={{flexGrow: 1, backgroundColor: "#eeeff0", columnGap: 3}}>
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
            <Link href="/">
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
              >
                JustArt
              </Button>
            </Link>
          </Box>

          <NavList/>

          <UserMenu/>

          <ShoppingCartButton/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
