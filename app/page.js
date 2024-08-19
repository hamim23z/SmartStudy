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
import Link from "next/link";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import QuizIcon from "@mui/icons-material/Quiz";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import PaymentsIcon from "@mui/icons-material/Payments";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

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
  const handleContact = () => {
    router.push("/contact");
  };

  return (
    <Container
      maxWidth="false"
      disableGutters
      sx={{ backgroundColor: "black" }}
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

      {/* Main Section */}
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url('/mainpic7.jpg')`,
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
            ml: 4,
            justifyContent: "center",
            alignItems: "center",
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
            onClick={handleContact} 
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
          paddingTop: "200px",
          paddingBottom: "200px",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            paddingBottom: "120px",
            textTransform: "uppercase",
            color: "white",
            fontFamily: "Kanit, sans-serif",
            fontWeight: "900",
          }}
        >
          Features
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          {[
            {
              title: "Customized Flashcards",
              text: "Create and tailor your own flashcards with no limitations for a personalized learning experience. Do it your way.",
              icon: (
                <LibraryBooksIcon
                  sx={{ fontSize: 40, mr: 2 }}
                ></LibraryBooksIcon>
              ),
            },
            {
              title: "Got stuck? Use our AI",
              text: "If you dont know what flashcards to make then ask our AI, ChronicleAI, for some ideas and new topics to review.",
              icon: <SmartToyIcon sx={{ fontSize: 40, mr: 2 }}></SmartToyIcon>,
            },
            {
              title: "Quizzes and Timers",
              text: "You can create your own quiz using your flashcards to track your progress. And you can start a timer to really focus!",
              icon: <QuizIcon sx={{ fontSize: 40, mr: 2 }}></QuizIcon>,
            },
            {
              title: "Personalized Profile",
              text: "Your account, your rules. Choose different themes and change your profile picture. Make it your experience.",
              icon: (
                <AccountCircleIcon
                  sx={{ fontSize: 40, mr: 2 }}
                ></AccountCircleIcon>
              ),
            },
            {
              title: "Premium Subscription",
              text: "Unlock exclusive features with different tiers. Choose the one that's best for you. You can always change and cancel.",
              icon: (
                <WorkspacePremiumIcon
                  sx={{ fontSize: 40, mr: 2 }}
                ></WorkspacePremiumIcon>
              ),
            },
            {
              title: "Secure Payments with Stripe",
              text: "We use Stripe for all of our payments, one of the most secure payment platforms in the world! We won’t ask other payment methods.",
              icon: <PaymentsIcon sx={{ fontSize: 40, mr: 2 }}></PaymentsIcon>,
            },
          ].map((feature, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{
                border: "2px solid black",
                padding: "15px",
                textAlign: "center",
                borderRadius: "50px",
                backgroundColor: "white",
                marginBottom: "80px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  mb: 2,
                }}
              >
                {feature.icon}
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {feature.title}
                </Typography>
              </Box>
              <Typography>{feature.text}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            marginBottom: "20px",
            fontWeight: "bold",
            paddingBottom: "120px",
            textTransform: "uppercase",
            color: "white",
            fontFamily: "Kanit, sans-serif",
            fontWeight: "900",
          }}
        >
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              title: "Basic",
              price: "$0/month",
              features: [
                "Individual configuration",
                "Limited to 1 person",
                "No hidden fees or setup",
                "Basic support",
              ],
            },
            {
              title: "Pro",
              price: "$5/month",
              features: [
                "Individual configuration",
                "Can add a collaborator",
                "No hidden fees or setup",
                "Priority support",
              ],
            },
            {
              title: "Premium",
              price: "$10/month",
              features: [
                "Individual configuration",
                "Can add as many people",
                "No hidden fees or setup",
                "Dedicated account manager",
              ],
            },
          ].map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <PricingCard
                title={plan.title}
                price={plan.price}
                features={plan.features}
                style={{
                  textDecoration: "none",
                  listStyle: "none",
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Typography
          variant="h6" // Change the variant to a smaller size
          sx={{
            paddingTop: "50px",
            color: "white",
            maxWidth: "800px", // Adjust the maxWidth as needed
            margin: "0 auto", // Center the text horizontally
            textAlign: "center", // Optional: Center align the text
          }}
        >
          All of our payments are made securely through Stripe. We will never
          use any outside payment methods nor ask for any extra payments. All
          communication will be sent via email. If you have any questions
          regarding payment, please contact us via our contact form.
        </Typography>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: "black",
          color: "white",
          p: 4,
          mt: "auto",
          borderTop: "1px solid #333",
          position: "relative",
          bottom: 0,
          width: "100%",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontFamily: "Kanit, sans-serif",
                  fontWeight: "900",
                  textTransform: "uppercase",
                }}
              >
                Smart Study
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                © {new Date().getFullYear()} Smart Study. All rights reserved.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Link
                  href="https://github.com/hamim23z/SmartStudy"
                  target="_blank"
                  color="inherit"
                  aria-label="GitHub"
                  sx={{
                    textDecoration: "none",
                    color: "white",
                    "&:hover": {
                      color: "white",
                    },
                  }}
                >
                  <GitHubIcon sx={{ color: "white" }} />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/hamimc/"
                  target="_blank"
                  color="inherit"
                  aria-label="LinkedIn"
                  sx={{
                    textDecoration: "none",
                    color: "white",
                    "&:hover": {
                      color: "white",
                    },
                  }}
                >
                  <LinkedInIcon sx={{ color: "white" }} />
                </Link>
                <Link
                  href="#"
                  color="inherit"
                  aria-label="Twitter"
                  sx={{
                    textDecoration: "none",
                    color: "white",
                    "&:hover": {
                      color: "white",
                    },
                  }}
                >
                  <TwitterIcon sx={{ color: "white" }} />
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontFamily: "Kanit, sans-serif", fontWeight: 900, textTransform: "uppercase"}}>
                Resources
              </Typography>
              <Stack spacing={1}>
                <Link
                  href="https://github.com/alexisj890/chronicleAI"
                  color="inherit"
                  sx={{
                    textDecoration: "none",
                    color: "white",
                    "&:hover": {
                      color: "white",
                    },
                  }}
                  style={{
                    color: "white",
                    textDecoration: "none"
                  }}
                >
                  Chronicle AI
                </Link>
                <Link
                  href="https://github.com/hamim23z/Pantry-Tracker"
                  color="inherit"
                  sx={{
                    textDecoration: "none",
                    color: "white",
                    "&:hover": {
                      color: "white",
                    },
                  }}
                  style={{
                    color: "white",
                    textDecoration: "none"
                  }}
                >
                  Pantry Tracker
                </Link>
                <Link
                  href="https://github.com/hamim23z/Material-UI"
                  color="inherit"
                  sx={{
                    textDecoration: "none",
                    color: "white",
                    "&:hover": {
                      color: "white",
                    },
                  }}
                  style={{
                    color: "white",
                    textDecoration: "none"
                  }}
                >
                  Material UI
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontFamily: "Kanit, sans-serif", fontWeight: 900, textTransform: "uppercase" }}>
                Legal
              </Typography>
              <Stack spacing={1}>
                <Link
                  href="/privacy"
                  color="inherit"
                  sx={{
                    textDecoration: "none",
                    color: "white",
                    "&:hover": {
                      color: "white",
                    },
                  }}
                  style={{
                    color: "white",
                    textDecoration: "none"
                  }}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  color="inherit"
                  sx={{
                    textDecoration: "none",
                    color: "white",
                    "&:hover": {
                      color: "white",
                    },
                  }}
                  style={{
                    color: "white",
                    textDecoration: "none"
                  }}
                >
                  Terms and Conditions
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
}
