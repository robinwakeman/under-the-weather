import React, { useDispatch, useGlobal, withInit } from 'reactn';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '~/theme';

class ReactNApp extends React.Component {
  componentDidMount() {
    // set global auth token to match local storage auth token every time app is mounted
    // (so user doesn't have to login again between sessions from the same browser)
    if(process.browser) {
      this.setGlobal({
        authToken: localStorage.authToken
      });
    }
  }
  render() {
    return this.props.children
  }
}

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ReactNApp>
      <React.Fragment>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </MuiPickersUtilsProvider>
        </ThemeProvider>
      </React.Fragment>
      </ReactNApp>
    );
  }
}

const INITIAL_STATE = {
  user: null,
  authToken: null,
}

export default withInit(INITIAL_STATE)(MyApp)