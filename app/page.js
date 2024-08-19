"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Box,
  Container,
  Typography,
  Stack,
  AppBar,
  Toolbar,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Head from "next/head";

// PricingCard Component
function PricingCard({ title, price, features }) {
  return (
    <Box
      sx={{
        border: "2px solid pink",
        padding: { xs: "15px", sm: "20px" },
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", paddingBottom: "10px" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", paddingBottom: "10px" }}
      >
        {price}
      </Typography>
      <ul style={{ paddingLeft: "20px", textAlign: "left" }}>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Select Plan
      </Button>
    </Box>
  );
}

export default function Home() {
  const router = useRouter();
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

  const handleSignInClick = () => {
    router.push("/sign-in"); // Navigate to the sign-in page
  };

  const handleSignUpClick = () => {
    router.push("/sign-up");
  };

  return (
    <Container
      maxWidth="false"
      disableGutters
      sx={{ backgroundColor: "white" }}
    >
      <Head>
        <title>Smart Study</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

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
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textTransform: "uppercase",
              fontFamily: "Kanit, sans-serif",
              fontWeight: "900",
              color: "white",
            }}
          >
            Smart Study
          </Typography>

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

      {/* Main Section */}
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url('/mainpic1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          paddingBottom: "100px",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            textTransform: "uppercase",
            fontFamily: "Kanit, sans-serif",
            fontWeight: "900",
            fontSize: { xs: "2rem", sm: "3rem" },
            color: "white",
            mb: 2,
          }}
        >
          Welcome to Smart Study
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "Kanit, sans-serif",
            fontWeight: "900",
            fontSize: { xs: "1rem", sm: "1.5rem" },
            color: "white",
          }}
        >
          The premiere flashcards and study materials for Computer Science
          Students
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Stack buttons on small screens
            gap: 2,
            mt: 4,
            ml: 7,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontFamily: "Kanit, sans-serif",
              fontWeight: "900",
              backgroundColor: "red",
            }}
          >
            Get Started
          </Button>

          <Button
            variant="contained"
            color="primary"
            sx={{
              fontFamily: "Kanit, sans-serif",
              fontWeight: "900",
              backgroundColor: "red",
            }}
          >
            Learn More
          </Button>

          <Button
            variant="contained"
            color="primary"
            sx={{
              fontFamily: "Kanit, sans-serif",
              fontWeight: "900",
              backgroundColor: "red",
            }}
          >
            Contact Sales
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          my: 4,
          minHeight: "100vh",
          backgroundImage: `url('/mainpic1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: { xs: "20px", sm: "40px" },
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            paddingBottom: "30px",
            textTransform: "uppercase",
          }}
        >
          Features
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            maxWidth: "1100px",
            mx: "auto",
          }}
        >
          {[
            {
              title: "Customized Flashcards",
              text: "Create and tailor your own flashcards with no limitations for a personalized learning experience.",
            },
            {
              title: "Got stuck? Use our AI",
              text: "If you dont know what flashcards to make then ask our AI, ChronicleAI, for some topics to review.",
            },
            {
              title: "Quizzes and Timers",
              text: "You can create your own quiz using your flashcards to track your progress. And you can start a timer to really focus!",
            },
            {
              title: "Personalized Profile",
              text: "Your account, your rules. Choose different themes and change your profile picture. Make it your experience.",
            },
            {
              title: "Premium Subscription",
              text: "Unlock exclusive features with different tiers. Choose the one that's best for you. You can always change and cancel.",
            },
            {
              title: "Secure Payments with Stripe",
              text: "We use Stripe for all of our payments, one of the most secure payment platforms in the world! We won’t ask other payment methods.",
            },
          ].map((feature, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{
                border: "2px solid pink",
                padding: "15px",
                textAlign: "center",
                borderRadius: "10px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", paddingBottom: "10px" }}
              >
                {feature.title}
              </Typography>
              <Typography>{feature.text}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ marginBottom: "20px", fontWeight: "bold" }}
        >
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { title: "Basic", price: "$10/month" },
            { title: "Pro", price: "$20/month" },
            { title: "Premium", price: "$30/month" },
          ].map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <PricingCard
                title={plan.title}
                price={plan.price}
                features={[
                  "Feature 1",
                  "Feature 2",
                  "Feature 3",
                  "Feature 4",
                  "Feature 5",
                ]}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Typography>Hello</Typography>
    </Container>
  );
}
