import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../components/header'; 
import { NextSeo } from 'next-seo';
import { AuthContextProvider } from "../context/AuthContext";
import theme from './theme';
import StyledAppWrapper from './StyledAppWrapper';
import CustomSnackbarProvider from './CustomSnackbarProvider';
import Layout from '../components/Layoyt'

function MyApp({ Component, pageProps }) {
  return (
    <StyledAppWrapper>
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <NextSeo
              title="りーどみー" 
            />
              <CustomSnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              > 
                <Header />
                  <Layout> 
                    <Component {...pageProps} />
                  </Layout>
            </CustomSnackbarProvider>
        </ThemeProvider>
      </AuthContextProvider>
    </StyledAppWrapper>
  );
}
export default MyApp;
