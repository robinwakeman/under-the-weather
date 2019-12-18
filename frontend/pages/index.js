import React, { useEffect } from 'react';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FilterDramaTwoToneIcon from '@material-ui/icons/FilterDramaTwoTone';

const LandingPage = () => {

  return (
  <div style={{
    minHeight: "100vh",
    width: "100%",
    background: 'linear-gradient(35deg, #556cd6 30%, #556cd6 90%)',
    display: "flex",
    justifyContent: "center",
    }}>
      <Box width={360} height={400} mt="10%">
        <Paper elevation={3} style={{height:"100%"}}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            pt={6}
            pb={8}
            px={7}
            height="100%"
            >
            <Box color="#333" display="flex" flexDirection="column" align="center">
              <FilterDramaTwoToneIcon fontSize="large" />
              <Typography variant="h6" align="center"> Under The Weather </Typography>
            </Box>
            <Link href="/login" underline="none">
              <Button variant="contained" color="secondary" size="large">
                Sign in
              </Button>
            </Link>
            <Link href="/register" underline="none">
              <Button variant="contained" color="secondary" size="large">
                Sign Up
              </Button>
            </Link>
            <Link href="/app/chartview" underline="none">
              <Button variant="contained" color="secondary" size="large">
                Demo
              </Button>
            </Link>
          </Box>
        </Paper>
      </Box>
  </div>
)};

export default LandingPage