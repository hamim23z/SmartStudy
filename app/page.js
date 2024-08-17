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
} from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <Container maxWidth="100vw">
      <Head>
        <title>Smart Study</title>
        <meta
          name="description"
          content="Create flashcards from your text"
        ></meta>
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Smart Study
          </Typography>
          <SignedOut>
            <Button style={{ color: "black" }}>Login</Button>
            <Button style={{ color: "black" }}>Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton></UserButton>
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          textAlign: "center",
          my: 4
        }}
      >
        <Typography variant="h2">Welcome to Smart Study</Typography>
        <Typography variant="subtitle1">
          {' '}
          The premiere flashcards and study materials for Computer Science Students
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Get Started
        </Button>
      </Box>
    </Container>
  );
}
