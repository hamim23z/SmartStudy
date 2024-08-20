"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, SignIn, SignUp, UserButton, useUser } from "@clerk/nextjs";
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
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/generate");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  if (isLoaded && isSignedIn) {
    return null; // Render nothing while redirecting
  }

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "black",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/" passHref style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                sx={{
                  textTransform: "uppercase",
                  fontFamily: "Kanit, sans-serif",
                  fontWeight: "900",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Smart Study
              </Typography>
            </Link>
          </Box>

          {/* Desktop Menu Items */}
          <Box sx={{ display: { xs: "none", sm: "flex", color: "white" } }}>
            {[
              { text: "Pricing", href: "/pricing" },
              { text: "GitHub", href: "https://github.com/hamim23z/SmartStudy" },
              { text: "LinkedIn", href: "https://www.linkedin.com/in/hamimc/" },
              { text: "Contact", href: "/contact" },
              { text: "Start Building", href: "#" },
            ].map(({ text, href }, index) => (
              <Button
                key={index}
                component="a"
                href={href}
                target={href.startsWith("http") ? "_blank" : "_self"}
                sx={{
                  color: "white",
                  fontFamily: "Kanit, sans-serif",
                  fontWeight: "900",
                  ml: 2,
                  mr: 2,
                  position: "relative",
                  perspective: "1000px",
                  overflow: "hidden",
                  transition: "transform 0.6s ease-in-out",
                  transformStyle: "preserve-3d",
                  "&:hover": {
                    color: "white",
                    transform: "rotateX(360deg)",
                    backgroundColor: "transparent",
                  },
                  "&::before": {
                    color: "white",
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "inherit",
                    transition: "transform 0.6s ease-in-out",
                    transform: "rotateX(360deg)",
                    zIndex: -1,
                  },
                  "&:hover::before": {
                    color: "white",
                    transform: "rotateX(360deg)",
                  },
                }}
              >
                {text}
              </Button>
            ))}

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
              {[
                { text: "Pricing", href: "/pricing" },
                { text: "GitHub", href: "https://github.com/hamim23z/SmartStudy" },
                { text: "LinkedIn", href: "https://www.linkedin.com/in/hamimc/" },
                { text: "Contact", href: "/contact" },
                { text: "Start Building", href: "#" },
              ].map(({ text, href }, index) => (
                <MenuItem key={index} onClick={handleMenuClose}>
                  <Button
                    component="a"
                    href={href}
                    target={href.startsWith("http") ? "_blank" : "_self"}
                    sx={{
                      color: "black",
                      fontFamily: "Kanit, sans-serif",
                      fontWeight: "900",
                      ml: 2,
                      mr: 2,
                      position: "relative",
                      perspective: "1000px",
                      overflow: "hidden",
                      transition: "transform 0.6s ease-in-out",
                      transformStyle: "preserve-3d",
                      "&:hover": {
                        color: "white",
                        transform: "rotateX(360deg)",
                        backgroundColor: "transparent",
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "inherit",
                        transition: "transform 0.6s ease-in-out",
                        transform: "rotateX(360deg)",
                        zIndex: -1,
                      },
                      "&:hover::before": {
                        transform: "rotateX(360deg)",
                      },
                    }}
                  >
                    {text}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          width: "100%",
          backgroundImage: `url(/mainpic4.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "calc(100vh - 84px)",
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
              color: "white",
            }}
          >
            Sign Up
          </Typography>
          <SignUp redirectUrl="/generate" />
        </Box>
      </Box>
    </>
  );
}