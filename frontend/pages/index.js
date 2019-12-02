import React from 'react';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

const LandingPage = () => (
  <div>
    <Link href="/login" underline="none">
      <Button variant="contained" color="primary">
        Sign in
      </Button>
    </Link>
    <Link href="/register" underline="none">
      <Button variant="contained" color="primary">
        Sign up
      </Button>
    </Link>
    <Link href="/app/chartview" underline="none">
      <Button variant="contained" color="primary">
        Demo
      </Button>
    </Link>
  </div>
);

export default LandingPage