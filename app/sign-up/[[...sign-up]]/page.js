"use client";
import { useState } from "react";
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, SignIn, SignUp, UserButton } from "@clerk/nextjs";
import {
  Box,
  Typography,
  Stack,
  AppBar,
  Toolbar,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Head from "next/head";
import Link from "next/link";

export default function SignUpPage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textTransform: "uppercase",
              fontFamily: "Kanit, sans-serif",
              fontWeight: "900",
            }}
          >
            Smart Study
          </Typography>

          {/* Desktop Menu Items */}
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <SignedOut>
              {[
                "Pricing",
                "GitHub",
                "LinkedIn",
                "Contact Sales",
                "Start Building",
              ].map((text, index) => (
                <Button
                  key={index}
                  component="a"
                  href="#"
                  target="_blank"
                  sx={{
                    color: "black",
                    fontFamily: "Kanit, sans-serif",
                    fontWeight: "900",
                    ml: 2,
                  }}
                >
                  {text}
                </Button>
              ))}
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              sx={{ mt: "45px" }}
            >
              <SignedOut>
                {[
                  "Pricing",
                  "GitHub",
                  "LinkedIn",
                  "Contact Sales",
                  "Start Building",
                ].map((text, index) => (
                  <MenuItem key={index} onClick={handleMenuClose}>
                    <Button
                      component="a"
                      href="#"
                      target="_blank"
                      sx={{
                        color: "black",
                        fontFamily: "Kanit, sans-serif",
                        fontWeight: "900",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      {text}
                    </Button>
                  </MenuItem>
                ))}
              </SignedOut>
              <SignedIn>
                <MenuItem onClick={handleMenuClose}>
                  <UserButton />
                </MenuItem>
              </SignedIn>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          width: "100%",
          backgroundImage: `url(/mainpic1.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "calc(100vh - 64px)", // Adjust this if the AppBar height changes
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              fontFamily: "Kanit, sans-serif",
              fontWeight: 900,
              paddingBottom: "50px",
              paddingTop: "60px",
              color: "white"
            }}
          >
            Sign Up
          </Typography>
          <SignUp />
        </Box>
      </Box>
    </>
  );
}
