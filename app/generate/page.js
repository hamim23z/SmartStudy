"use client";
import { useState } from "react";
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
  Paper,
  TextField,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import MenuIcon from "@mui/icons-material/Menu";
import Head from "next/head";
import Link from "next/link";
import { db } from "@/firebase";
import { writeBatch, doc, collection, getDoc } from "firebase/firestore";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

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

  const handleSubmit = async () => {
    fetch("api/generate", {
      method: "POST",
      body: text,
    })
      .then((res) => res.json())
      .then((data) => setFlashcards(data));
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert(`Please enter a name for the flashcards!`);
      return;
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const collections = data.flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert("Flashcard collection with the same name already exists");
        return;
      }

      // Update flashcards array with new collection name
      collections.push({ name });
      batch.update(userDocRef, { flashcards: collections });
    } else {
      // Create new document with flashcards
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });

    await batch.commit();
    handleClose();
    router.push("/flashcards");
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

          <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
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



      {/* Main Content */}
      <Box
        sx={{
          backgroundImage: `url(/mainpic1.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "calc(100vh - 84px)", // Adjust this if the AppBar height changes
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Kanit, sans-serif",
                fontWeight: "900",
                paddingBottom: "50px",
                color: "white",
                textTransform: "uppercase"
              }}
            >
              Generate Flashcards using ChronicleAI
            </Typography>

            <Paper
              sx={{
                p: 4,
                width: "100%",
              }}
            >
              <TextField
                value={text}
                onChange={(e) => setText(e.target.value)}
                label="Enter text here"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                sx={{
                  mb: 2,
                }}
              ></TextField>

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
              >
                Submit
              </Button>
            </Paper>
          </Box>

          {flashcards.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" sx={{ color: "white", fontFamily: "Kanit, sans-serif", fontWeight: "900", textAlign: "center", paddingBottom: "30px" }}>
                Flashcards Previewed
              </Typography>
              <Grid container spacing={3}>
                {flashcards.map((flashcard, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card>
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
                                height: "200px",
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
                                <Typography variant="h5" component="div">
                                  {flashcard.front}
                                </Typography>
                              </div>
                              <div>
                                <Typography variant="h5" component="div">
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

              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "60px"
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleOpen}
                  sx = {{
                    fontFamily: "Kanit, sans-serif",
                    fontWeight: "900"
                  }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          )}

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Save Flashcards</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your flashcards collection.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Collection Name"
                type="text"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
              ></TextField>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={saveFlashcards}>Save</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>

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
