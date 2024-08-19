"use client"; 
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Grid,
  IconButton,
  Menu,
  TextField,
  Snackbar,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Head from "next/head";
import Link from "next/link";

export default function Contact() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // State variables for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleSignInClick = () => {
    router.push("/sign-in"); // Navigate to the sign-in page
  };

  const handleSignUpClick = () => {
    router.push("/sign-up");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSendMessage = () => {
    // Show Snackbar
    setSnackbarOpen(true);

    // Clear form inputs
    setFirstName("");
    setLastName("");
    setEmail("");
    setFeedback("");
  };

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
              {" "}
              {/* Remove underline from Link */}
              <Typography
                variant="h6"
                sx={{
                  textTransform: "uppercase",
                  fontFamily: "Kanit, sans-serif",
                  fontWeight: "900",
                  color: "white",
                  cursor: "pointer", // Indicate it's clickable
                }}
              >
                Smart Study
              </Typography>
            </Link>
          </Box>

          {/* Desktop Menu Items */}
          <Box sx={{ display: { xs: "none", sm: "flex", color: "white" } }}>
            {/* Items that should always be visible */}
            {[
              { text: "Pricing", href: "/pricing" },
              {
                text: "GitHub",
                href: "https://github.com/hamim23z/SmartStudy",
              },
              {
                text: "LinkedIn",
                href: "https://www.linkedin.com/in/hamimc/",
              },
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
                  perspective: "1000px", // Add perspective for 3D effect
                  overflow: "hidden", // Ensure contents do not overflow the button
                  transition: "transform 0.6s ease-in-out", // Smooth transition for rotation
                  transformStyle: "preserve-3d", // Ensure 3D space for rotation
                  "&:hover": {
                    color: "white",
                    transform: "rotateX(360deg)", // Rotate vertically on hover
                    backgroundColor: "transparent", // Avoid background color change on hover
                  },
                  "&::before": {
                    color: "white",
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "inherit", // Inherit the button's background
                    transition: "transform 0.6s ease-in-out",
                    transform: "rotateX(360deg)",
                    zIndex: -1,
                  },
                  "&:hover::before": {
                    color: "white",
                    transform: "rotateX(360deg)", // Rotate to reveal the button's background on hover
                  },
                }}
              >
                {text}
              </Button>
            ))}

            {/* UserButton visible when signed in */}
            <SignedIn>
              <UserButton />
            </SignedIn>

            {/* Sign-in/Sign-up buttons visible when signed out */}
            <SignedOut>
              <Button
                onClick={handleSignInClick}
                sx={{
                  color: "white",
                  fontFamily: "Kanit, sans-serif",
                  fontWeight: "900",
                  ml: 2,
                  mr: 2,
                  position: "relative",
                  perspective: "1000px", // Add perspective for 3D effect
                  overflow: "hidden", // Ensure contents do not overflow the button
                  transition: "transform 0.6s ease-in-out", // Smooth transition for rotation
                  transformStyle: "preserve-3d", // Ensure 3D space for rotation
                  "&:hover": {
                    color: "white",
                    transform: "rotateX(360deg)", // Rotate vertically on hover
                    backgroundColor: "transparent", // Avoid background color change on hover
                  },
                  "&::before": {
                    color: "white",
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "inherit", // Inherit the button's background
                    transition: "transform 0.6s ease-in-out",
                    transform: "rotateX(360deg)",
                    zIndex: -1,
                  },
                  "&:hover::before": {
                    color: "white",
                    transform: "rotateX(360deg)", // Rotate to reveal the button's background on hover
                  },
                }}
              >
                Sign In
              </Button>
              <Button
                onClick={handleSignUpClick}
                sx={{
                  color: "white",
                  fontFamily: "Kanit, sans-serif",
                  fontWeight: "900",
                  ml: 2,
                  mr: 2,
                  position: "relative",
                  perspective: "1000px", // Add perspective for 3D effect
                  overflow: "hidden", // Ensure contents do not overflow the button
                  transition: "transform 0.6s ease-in-out", // Smooth transition for rotation
                  transformStyle: "preserve-3d", // Ensure 3D space for rotation
                  "&:hover": {
                    color: "white",
                    transform: "rotateX(360deg)", // Rotate vertically on hover
                    backgroundColor: "transparent", // Avoid background color change on hover
                  },
                  "&::before": {
                    color: "white",
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "inherit", // Inherit the button's background
                    transition: "transform 0.6s ease-in-out",
                    transform: "rotateX(360deg)",
                    zIndex: -1,
                  },
                  "&:hover::before": {
                    color: "white",
                    transform: "rotateX(360deg)", // Rotate to reveal the button's background on hover
                  },
                }}
              >
                Sign Up
              </Button>
            </SignedOut>
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
              {/* Items that should always be visible */}
              {[
                { text: "Pricing", href: "/pricing" },
                {
                  text: "GitHub",
                  href: "https://github.com/hamim23z/SmartStudy",
                },
                {
                  text: "LinkedIn",
                  href: "https://www.linkedin.com/in/hamimc/",
                },
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
                      perspective: "1000px", // Add perspective for 3D effect
                      overflow: "hidden", // Ensure contents do not overflow the button
                      transition: "transform 0.6s ease-in-out", // Smooth transition for rotation
                      transformStyle: "preserve-3d", // Ensure 3D space for rotation
                      "&:hover": {
                        color: "white",
                        transform: "rotateX(360deg)", // Rotate vertically on hover
                        backgroundColor: "transparent", // Avoid background color change on hover
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "inherit", // Inherit the button's background
                        transition: "transform 0.6s ease-in-out",
                        transform: "rotateX(360deg)",
                        zIndex: -1,
                      },
                      "&:hover::before": {
                        transform: "rotateX(360deg)", // Rotate to reveal the button's background on hover
                      },
                    }}
                  >
                    {text}
                  </Button>
                </MenuItem>
              ))}

              {/* UserButton visible when signed in */}
              <SignedIn>
                <MenuItem onClick={handleMenuClose}>
                  <UserButton />
                </MenuItem>
              </SignedIn>

              {/* Sign-in/Sign-up buttons visible when signed out */}
              <SignedOut>
                <MenuItem onClick={handleMenuClose}>
                  <Button
                    onClick={handleSignInClick}
                    sx={{
                      color: "black",
                      fontFamily: "Kanit, sans-serif",
                      fontWeight: "900",
                      ml: 2,
                      mr: 2,
                      position: "relative",
                      perspective: "1000px", // Add perspective for 3D effect
                      overflow: "hidden", // Ensure contents do not overflow the button
                      transition: "transform 0.6s ease-in-out", // Smooth transition for rotation
                      transformStyle: "preserve-3d", // Ensure 3D space for rotation
                      "&:hover": {
                        color: "white",
                        transform: "rotateX(360deg)", // Rotate vertically on hover
                        backgroundColor: "transparent", // Avoid background color change on hover
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "inherit", // Inherit the button's background
                        transition: "transform 0.6s ease-in-out",
                        transform: "rotateX(360deg)",
                        zIndex: -1,
                      },
                      "&:hover::before": {
                        transform: "rotateX(360deg)", // Rotate to reveal the button's background on hover
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Button
                    onClick={handleSignUpClick}
                    sx={{
                      color: "black",
                      fontFamily: "Kanit, sans-serif",
                      fontWeight: "900",
                      ml: 2,
                      mr: 2,
                      position: "relative",
                      perspective: "1000px", // Add perspective for 3D effect
                      overflow: "hidden", // Ensure contents do not overflow the button
                      transition: "transform 0.6s ease-in-out", // Smooth transition for rotation
                      transformStyle: "preserve-3d", // Ensure 3D space for rotation
                      "&:hover": {
                        color: "white",
                        transform: "rotateX(360deg)", // Rotate vertically on hover
                        backgroundColor: "transparent", // Avoid background color change on hover
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "inherit", // Inherit the button's background
                        transition: "transform 0.6s ease-in-out",
                        transform: "rotateX(360deg)",
                        zIndex: -1,
                      },
                      "&:hover::before": {
                        transform: "rotateX(360deg)", // Rotate to reveal the button's background on hover
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </MenuItem>
              </SignedOut>
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
          minHeight: "calc(100vh - 84px)", // Adjust this if the AppBar height changes
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.85)", // Increased opacity for better legibility
            padding: 4,
            borderRadius: 2,
            maxWidth: "600px",
            width: "100%",
            color: "white",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              fontFamily: "Kanit, sans-serif",
              fontWeight: 900,
              color: "white",
              mb: 4,
            }}
          >
            Contact Us
          </Typography>

          <Typography variant="body1" sx={{ color: "white", mb: 2 }}>
            We would love to hear from you! Please fill out the form below with
            your feedback or any inquiries you may have.
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                variant="filled"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="filled"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Work Email"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ backgroundColor: "white", mt: 2, borderRadius: 1 }}
          />

          <TextField
            fullWidth
            label="Your Feedback"
            variant="filled"
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{ backgroundColor: "white", mt: 2, borderRadius: 1 }}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{
              fontFamily: "Kanit, sans-serif",
              fontWeight: 900,
              mt: 3,
              backgroundColor: "red",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
            onClick={handleSendMessage}
          >
            Send Message
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Message sent, thanks for the feedback!"
      />
    </>
  );
}
