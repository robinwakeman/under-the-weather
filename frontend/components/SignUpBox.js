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
import RegisterForm from '~/components/RegisterForm';

export default function SignUpBox(props) {

  return (
    <Box
      width={360}
      height={420}
      mt="10%"
      zIndex={1000}
      >
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
          <RegisterForm />
          <Button onClick={props.onBackClick} color="primary" size="large">
            Back
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}