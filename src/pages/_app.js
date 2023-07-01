import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../components/header'; 
import { NextSeo } from 'next-seo';
import { AuthContextProvider } from "../context/AuthContext";
import theme from '../utils/theme';
import StyledAppWrapper from '../../styles/StyledAppWrapper';
import CustomSnackbarProvider from '../../styles/CustomSnackbarProvider';
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
                  vertical: 'bottom',
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
