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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Divider from "@mui/material/Divider";
import { NavList, ShoppingCartButton, UserMenu } from "@/components/Navbar/components";

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

  // Define menu items for the drawer
  // const menuItems = [
  //   { text: "Home", icon: <HomeIcon />, href: "/" },
  //   { text: "About", icon: <InfoIcon />, href: "/about" },
  //   { text: "Contact", icon: <ContactMailIcon />, href: "/contact" },
  // ];

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
              <List>
                {/* Mapping over menuItems to dynamically create the list */}
                {/* {menuItems.map((item, index) => (
                  <Link key={index} href={item.href} passHref>
                    <ListItem button>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  </Link>
                ))} */}
              </List>
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
