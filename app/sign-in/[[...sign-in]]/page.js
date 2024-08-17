import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
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

export default function SignUpPage() {
  return (
    <Container maxWidth="sm">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            SmartStudy
          </Typography>
          <Button>
            <Link href="/sign-in" passHref>
              Sign In
            </Link>
          </Button>

          <Button>
            <Link href="/sign-up" passHref>
              Sign Up
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4">
            Sign In
        </Typography>
        <SignIn></SignIn>
      </Box>
    </Container>
  );
}
