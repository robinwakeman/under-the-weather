import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useGlobal } from 'reactn'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FilterDramaTwoToneIcon from '@material-ui/icons/FilterDramaTwoTone';
import FlipCard from '~/components/FlipCard';
import LandingBox from '~/components/LandingBox';
import SignInBox from '~/components/SignInBox';
import SignUpBox from '~/components/SignUpBox';

const LandingPage = () => {

  // next.js built-in frontend router
  const router = useRouter();

  // for authentication
  const [ authToken, setAuthToken ] = useGlobal('authToken');
  // for FlipCard component
  const [ flipped, setFlipped ] = useState(false);
  const [ backComponent, setBackComponent ] = useState('');

  // redirect users with active tokens to logged-in view
  useEffect(() => {
    if(authToken != '' && authToken != undefined) {
      router.push('/app/chartview');
    }
  },[authToken]);

  // flip to show different component on click
  const landingFlip = () => {
    setBackComponent(<LandingBox />);
    setFlipped(false);
  };
  const signInFlip = () => {
    setBackComponent(<SignInBox onBackClick={landingFlip} />);
    setFlipped(true);
  };
  const signUpFlip = () => {
    setBackComponent(<SignUpBox onBackClick={landingFlip}/>);
    setFlipped(true);
  };

  return (
  <div style={{
    minHeight: "100vh",
    width: "100%",
    background: 'linear-gradient(35deg, #556cd6 30%, #556cd6 90%)',
    display: "flex",
    justifyContent: "center",
    }}>
    <FlipCard
      flipped={flipped}
      front={<LandingBox onSignInClick={signInFlip} onSignUpClick={signUpFlip}/>}
      back={backComponent}
      />
  </div>
)};

export default LandingPage