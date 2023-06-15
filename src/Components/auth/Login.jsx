import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { AuthContext } from "../../Context/authContext";

const Login = () => {
  const authContext = useContext(AuthContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Basic " +
        window.btoa(
          unescape(
            encodeURIComponent(data.get("email") + ":" + data.get("password"))
          )
        )
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    let headers = null;
    fetch("http://localhost:8080/auth/login", requestOptions)
      .then((response) => response)
      .then((result) => {
        headers = [...result.headers.entries()].filter((res) =>
          res.includes("authorization")
        )[0][1];
        return result.json();
      })
      .then((result) => authContext.login(headers, result.name))
      .catch((error) => console.log("error", error));
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
