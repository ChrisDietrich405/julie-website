"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { NavList, ShoppingCartButton } from "@/components/Navbar/components";
import dynamic from "next/dynamic";

const UserMenu = dynamic(() => import('./components/UserMenu/UserMenu'), {ssr: false})

export default function Navbar() {
  // State for controlling the drawer's open/close status
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Function to toggle the drawer's open/close status
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const appBarStyle = {
    backgroundColor: "white",
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar sx={{ flexGrow: 1, backgroundColor: "#eeeff0", columnGap: 3 }}>
          {/* IconButton for toggling the Drawer */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { sm: "block", md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Drawer component */}
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <Divider />
              <NavList /> {/* Optional: Include existing navigation list if needed */}
            </Box>
          </Drawer>

          <Box flexGrow={1}>
            <Link href="/">
              <Button
                variant="text"
                component="h1"
                sx={{
                  color: "black",
                  width: "auto",
                  justifyContent: "start",
                  padding: 0,
                  fontWeight: 500,
                  fontSize: "1.25rem",
                  lineHeight: 1.6,
                  textTransform: "capitalize",
                }}
              >
                JUST ART
              </Button>
            </Link>
          </Box>

          <NavList sx={{ display: { xs: "none", md: "flex" } }} />

          <UserMenu />

          <ShoppingCartButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
