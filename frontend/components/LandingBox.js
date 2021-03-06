import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import { useGlobal } from 'reactn'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FilterDramaTwoToneIcon from '@material-ui/icons/FilterDramaTwoTone';
import FlipCard from '~/components/FlipCard';

export default function LandingBox(props) {

  return (
    <Box
      width={350}
      height={364}
      zIndex={1000}
      >
      <Paper elevation={3} style={{height:"100%"}}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around" // todo space-between when re-adding demo button
          alignItems="center"
          pt={5.5}
          pb={8}
          px={7}
          height="100%"
          >
          <Box color="#333" display="flex" flexDirection="column" align="center">
            <FilterDramaTwoToneIcon fontSize="large" />
            <Typography variant="h6" align="center"> Under The Weather </Typography>
          </Box>
          <Button
            onClick={props.onSignInClick} variant="contained" color="secondary" size="large">
            Sign in
          </Button>
          <Button onClick={props.onSignUpClick} variant="contained" color="secondary" size="large">
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}