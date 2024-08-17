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
} from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <Container
      maxWidth={false}
      disableGutters
      style={{ backgroundColor: "green" }}
    >
      <Head>
        <title>Smart Study</title>
        <meta
          name="description"
          content="Create flashcards from your text"
        ></meta>
      </Head>

      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
              fontWeight: "",
              textTransform: "uppercase",
              fontFamily: "Kanit, sans-serif",
              fontWeight: "900",
            }}
          >
            Smart Study
          </Typography>
          <SignedOut>
            <Button
              component="a"
              href="#"
              target="_blank"
              style={{
                color: "black",
                fontFamily: "Kanit, sans-serif",
                fontWeight: "900",
              }}
            >
              Pricing
            </Button>
            <Button
              component="a"
              href="https://github.com/hamim23z"
              target="_blank"
              style={{
                color: "black",
                fontFamily: "Kanit, sans-serif",
                fontWeight: "900",
              }}
            >
              GitHub
            </Button>
            <Button
              component="a"
              href="https://www.linkedin.com/in/hamimc/"
              target="_blank"
              style={{
                color: "black",
                fontFamily: "Kanit, sans-serif",
                fontWeight: "900",
              }}
            >
              LinkedIn
            </Button>
            <Button
              component="a"
              href="#"
              target="_blank"
              style={{
                color: "black",
                fontFamily: "Kanit, sans-serif",
                fontWeight: "900",
              }}
            >
              Contact Sales
            </Button>
            <Button
              component="a"
              href="#"
              target="_blank"
              style={{
                color: "black",
                fontFamily: "Kanit, sans-serif",
                fontWeight: "900",
              }}
            >
              Start Building
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton></UserButton>
          </SignedIn>
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
        }}
      >
        <Typography
          variant="h2"
          sx={{
            textTransform: "uppercase",
            fontFamily: "Kanit, sans-serif",
            fontWeight: "900",
          }}
        >
          Welcome to Smart Study
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "Kanit, sans-serif",
            fontWeight: "900",
          }}
        >
          The premiere flashcards and study materials for Computer Science
          Students
        </Typography>
        <Typography
          sx={{
            display: "flex",
            flexDirection: "row",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              marginRight: "10px",
              fontFamily: "Kanit, sans-serif",
              fontWeight: "900",
            }}
          >
            Get Started
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              marginRight: "10px",
              fontFamily: "Kanit, sans-serif",
              fontWeight: "900",
            }}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              marginRight: "10px",
              fontFamily: "Kanit, sans-serif",
              fontWeight: "900",
            }}
          >
            Sign Out
          </Button>
        </Typography>
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
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: "center",
            paddingBottom: "50px",
            textTransform: "uppercase",
          }}
        >
          Features
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            textAlign: "center",
            padding: "25px",
            backgroundColor: "red",
            margin: "0 auto",
            maxWidth: "1200px",
            maxHeight: "1800px",
          }}
        >
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              border: "2px solid pink",
              paddingRight: "10px",
              paddingBottom: "20px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                paddingBottom: "15px",
              }}
            >
              Customized Flashcards
            </Typography>
            <Typography>
              Create and tailor your own flashcards with no limitations for a
              personalized learning experience.
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              border: "2px solid pink",
              paddingRight: "10px",
              paddingBottom: "20px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                paddingBottom: "15px",
              }}
            >
              Got stuck? Use our AI
            </Typography>
            <Typography>
              If you dont know what flashcards to make then ask our AI,
              ChronicleAI, for some topics to review.
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              border: "2px solid pink",
              paddingRight: "10px",
              paddingBottom: "20px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                paddingBottom: "15px",
              }}
            >
              Quizzes and Timers
            </Typography>
            <Typography>
              You can create your own quiz using your flashcards to track your
              progress. And you can start a timer to really focus!
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              border: "2px solid pink",
              paddingRight: "10px",
              paddingBottom: "20px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                paddingBottom: "15px",
              }}
            >
              Personalized Profile
            </Typography>
            <Typography>
              Your account, your rules. Choose different themes and change your
              profile picture. Make it your experience.{" "}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              border: "2px solid pink",
              paddingRight: "10px",
              paddingBottom: "20px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                paddingBottom: "15px",
              }}
            >
              Premium Subscription
            </Typography>
            <Typography>
              Unlock exclusive features with different tiers. Choose the one
              that&apos;s best for you. You can always change and cancel.{" "}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              border: "2px solid pink",
              paddingRight: "10px",
              paddingBottom: "20px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                paddingBottom: "15px",
              }}
            >
              Secure Payments with Stripe
            </Typography>
            <Typography>
              We use Stripe for all of our payments, one of the most secure
              payment platforms in the world! We won&apos;t ask other payment
              methods.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
