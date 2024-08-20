"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
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
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import MenuIcon from "@mui/icons-material/Menu";
import Head from "next/head";
import Link from "next/link";
import { db } from "@/firebase";
import {
  doc,
  collection,
  getDocs,
} from "firebase/firestore";
import { useSearchParams } from "next/navigation";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const router = useRouter();

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;
      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);
      const flashcards = [];

      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    }
    getFlashcard();
  }, [search, user]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSignInClick = () => {
    router.push("/sign-in");
  };

  const handleSignUpClick = () => {
    router.push("/sign-up");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

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
                Sign Up
              </Button>
            </SignedOut>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
            sx={{ display: { xs: "flex", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose} sx = {{fontWeight: "bold"}}>
            {[
              { text: "Pricing", href: "/pricing" },
              {
                text: "GitHub",
                href: "https://github.com/hamim23z/SmartStudy",
              },
              { text: "LinkedIn", href: "https://www.linkedin.com/in/hamimc/" },
              { text: "Contact", href: "/contact" },
              { text: "Start Building", href: "#" },
            ].map(({ text, href }, index) => (
              <MenuItem
                key={index}
                component="a"
                href={href}
                target={href.startsWith("http") ? "_blank" : "_self"}
                onClick={handleMenuClose}
                sx = {{
                  fontWeight: "bold"
                }}
              >
                {text}
              </MenuItem>
            ))}

            <SignedIn>
              <MenuItem onClick={handleMenuClose}>
                <UserButton />
              </MenuItem>
            </SignedIn>

            <SignedOut>
              <MenuItem onClick={handleSignInClick}>Sign In</MenuItem>
              <MenuItem onClick={handleSignUpClick}>Sign Up</MenuItem>
            </SignedOut>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          backgroundImage: `url(/mainpic1.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "calc(100vh - 84px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg" sx= {{paddingBottom: "100px"}}>
          {" "}
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ maxWidth: 700 }}>
                  {" "}
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent>
                      <Box
                        sx={{
                          perspective: "1000px",
                          "& > div": {
                            transition: "transform 0.6s",
                            transformStyle: "preserve-3d",
                            position: "relative",
                            width: "100%",
                            height: "175px", // Adjusted height
                            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                            transform: flipped[index]
                              ? "rotateY(180deg)"
                              : "rotateY(0deg)",
                          },
                          "& > div > div": {
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 2,
                            boxSizing: "border-box",
                          },
                          "& > div > div:nth-of-type(2)": {
                            transform: "rotateY(180deg)",
                          },
                        }}
                      >
                        <div>
                          <div>
                            <Typography
                              variant="h6"
                              component="div"
                              sx={{
                                fontSize: "18px",
                                textAlign: "center",
                                fontFamily: "Kanit, sans-serif",
                                fontWeight: "bold"
                              }}
                            >
                              {" "}
                              {flashcard.front}
                            </Typography>
                          </div>
                          <div>
                            <Typography
                              variant="h6"
                              component="div"
                              sx={{
                                fontSize: "14px",
                              }}
                            >
                              {" "}
                              {flashcard.back}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>



      {/*Footer*/}
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
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
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
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
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
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontFamily: "Kanit, sans-serif",
                  fontWeight: 900,
                  textTransform: "uppercase",
                }}
              >
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
                    textDecoration: "none",
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
                    textDecoration: "none",
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
                    textDecoration: "none",
                  }}
                >
                  Material UI
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontFamily: "Kanit, sans-serif",
                  fontWeight: 900,
                  textTransform: "uppercase",
                }}
              >
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
                    textDecoration: "none",
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
                    textDecoration: "none",
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
