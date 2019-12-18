import React, { useDispatch, useGlobal, withInit } from 'reactn';
import cookies from 'next-cookies';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import App from 'next/app';
import Head from 'next/head';
import DateFnsUtils from '@date-io/date-fns';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '~/theme';


class MyApp extends App {

  // provide cookie auth token as a prop for App
  static async getInitialProps({ctx}) {
    return {
      initialAuthToken: cookies(ctx).authToken || ''
    }
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, initialAuthToken } = this.props;

    // set the default global state to have auth token from cookie (via props)
    // so that user stays logged in between sessions from the same browser
    const INITIAL_GLOBAL_STATE = {
      user: null,
      authToken: initialAuthToken,
    }

    // Components wrapped by this will have access to the global state
    const ReactNApp = withInit(INITIAL_GLOBAL_STATE)(
      (props) => {
         return props.children
      }
    );

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



export default MyApp